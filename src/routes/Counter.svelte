<script lang="ts">
	import { DateTime, Duration, Interval } from 'luxon';
	import { browser } from '$app/environment';
	import Time, { State } from './Time.svelte';
	import { get, set } from 'idb-keyval';
	import { onMount } from 'svelte';

	type WorkRecord = { isWorking: boolean; timestamp: DateTime };
	type SerializedWorkRecords = {
		isWorking: boolean;
		timestamp: number;
	};

	const IDB_KEY_FORMAT = 'yyyy_MM_dd';
	const PRINT_FORMAT = 'hh:mm:ss';

	let isWorking = false;
	let workRecords: WorkRecord[] = [];

	let currentPeriod = '';
	let totallyWorked = '';
	let pauseDuration = ''; // todo: remove from here?

	const serializeWorkRecords = (workRecords: WorkRecord[]): SerializedWorkRecords[] => {
		return workRecords.map((workRecord) => ({
			isWorking: workRecord.isWorking,
			timestamp: workRecord.timestamp.toMillis()
		}));
	};

	const restoreWorkRecords = (serializedWorkRecords: SerializedWorkRecords[]): WorkRecords[] => {
		return serializedWorkRecords.map((workRecord) => ({
			isWorking: workRecord.isWorking,
			timestamp: DateTime.fromMillis(workRecord.timestamp)
		}));
	};

	const readData = async () => {
		workRecords = restoreWorkRecords((await get(DateTime.now().toFormat(IDB_KEY_FORMAT))) ?? []);
		if (workRecords.length) isWorking = workRecords.at(-1)?.isWorking ?? false;
	};

	onMount(() => {
		readData();
	});

	const switchState = () => {
		isWorking = !isWorking;
		const newWorkRecord = { isWorking, timestamp: DateTime.now() };
		workRecords.push(newWorkRecord);
		workRecords = workRecords;

		set(DateTime.now().toFormat(IDB_KEY_FORMAT), serializeWorkRecords(workRecords));
	};

	const workRecordsReducer = (
		duration: Duration,
		workRecord: WorkRecord,
		currentIndex: number,
		workRecords: WorkRecord[]
	) => {
		if (workRecord.isWorking) {
			const currentInterval = Interval.fromDateTimes(workRecord.timestamp, DateTime.now());
			return currentIndex === workRecords.length - 1
				? duration.plus(currentInterval.toDuration())
				: duration;
		}

		const lastWorkingInterval = Interval.fromDateTimes(
			workRecords[currentIndex - 1].timestamp,
			workRecord.timestamp
		);
		return duration.plus(lastWorkingInterval.toDuration());
	};

	const pauseRecordsReducer = (
		duration: Duration,
		workRecord: WorkRecord,
		currentIndex: number,
		workRecords: WorkRecord[]
	) => {
		const previousRecord = workRecords[currentIndex - 1];
		if (!workRecord.isWorking || !previousRecord || (previousRecord && previousRecord?.isWorking))
			return duration;
		return duration.plus(
			Interval.fromDateTimes(previousRecord.timestamp, workRecord.timestamp).toDuration()
		);
	};

	const canShare = browser && !!navigator.canShare?.({ text: '' });

	const prepareExportString = () => {
		const firstWorkingTime = workRecords
			.find((workRecord) => workRecord.isWorking)
			?.timestamp.toFormat(PRINT_FORMAT);
		const lastWorkingTime: WorkRecord = workRecords.findLast((workRecord) => workRecord.isWorking);
		pauseDuration = workRecords
			.reduce(pauseRecordsReducer, Duration.fromMillis(0))
			.toFormat(PRINT_FORMAT);
		return `${firstWorkingTime}\t${lastWorkingTime.timestamp.toFormat(
			PRINT_FORMAT
		)}\t\t\t${pauseDuration}`;
	};

	const shareOrSave = async () => {
		if (!browser) return;
		const text = prepareExportString();
		if (navigator.canShare?.({ text })) {
			try {
				await navigator.share({
					title: 'Share all barcodes',
					text
				});
				console.log('shared', pauseDuration);
			} catch (error) {
				console.error(error);
			}
		} else {
			const a = document.createElement('a');
			const filename = DateTime.now().toFormat('yyyy-mm-dd');
			a.href = window.URL.createObjectURL(
				new File([text], `report_${filename}.txt`, {
					type: 'text/plain'
				})
			);
			a.download = filename;
			a.click();
		}
	};

	const updateCurrentPeroid = () => {
		if (!browser) return;
		if (workRecords.length) {
			if (workRecords[0].timestamp.day !== DateTime.now().day) {
				resetRecords();
				return;
			}

			const now = DateTime.now();
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			currentPeriod = now.diff(workRecords.at(-1)!.timestamp).toFormat(PRINT_FORMAT);

			totallyWorked = workRecords
				.reduce(workRecordsReducer, Duration.fromMillis(0))
				.toFormat(PRINT_FORMAT);
		}
		window.requestAnimationFrame(updateCurrentPeroid);
	};

	browser && window.requestAnimationFrame(updateCurrentPeroid);

	let state: State;
	$: {
		if (!workRecords.length) state = State.NotStarted;
		else if (isWorking) state = State.Working;
		else state = State.Chilling;
	}

	const resetRecords = () => {
		workRecords = [];
		isWorking = false;
	};
</script>

<main>
	<Time {state} currentDuration={currentPeriod} {totallyWorked} />
</main>

<footer>
	<button on:click={switchState}>{isWorking ? 'Pause' : 'Work'}</button>
	<section>
		<button on:click={resetRecords} class="outline warning">Reset</button>
		<button on:click={shareOrSave} class="outline">{canShare ? 'Share' : 'Save'}</button>
	</section>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		width: 100%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer section {
		display: flex;
		flex-direction: row;
		/* flex-wrap: wrap; */
		justify-content: center;
		width: 100%;
		gap: var(--spacing);
	}

	footer section button:first-child {
		flex: auto 0 5;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}

	button.warning {
		color: #f0f9;
		border-color: #f0f9;
	}
	button.warning:hover {
		color: fuchsia;
		border-color: fuchsia;
	}
</style>
