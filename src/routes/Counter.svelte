<script lang="ts">
	import { DateTime, Duration, Interval } from 'luxon';
	import { browser } from '$app/environment';
	import Time, { State } from './Time.svelte';

	type WorkRecord = { isWorking: boolean; timestamp: DateTime };

	let isWorking = false;
	let workRecords: WorkRecord[] = [];
	const switchState = () => {
		isWorking = !isWorking;
		workRecords = [...workRecords, { isWorking, timestamp: DateTime.now() }];
	};

	let currentPeriod = '';
	let totallyWorked = '';
	let pauseDuration = ''; // todo: remove from here?

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
			?.timestamp.toFormat('hh:mm:ss');
		const lastWorkingTime: WorkRecord = workRecords.findLast((workRecord) => workRecord.isWorking);
		pauseDuration = workRecords
			.reduce(pauseRecordsReducer, Duration.fromMillis(0))
			.toFormat('hh:mm:ss');
		return `${firstWorkingTime}\t${lastWorkingTime.timestamp.toFormat(
			'hh:mm:ss'
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
			const now = DateTime.now();
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			currentPeriod = now.diff(workRecords.at(-1)!.timestamp).toFormat('hh:mm:ss');

			totallyWorked = workRecords
				.reduce(workRecordsReducer, Duration.fromMillis(0))
				.toFormat('hh:mm:ss');
		}
		window.requestAnimationFrame(updateCurrentPeroid);
	};

	browser && window.requestAnimationFrame(updateCurrentPeroid);

	let state: State;
	$: if (!workRecords.length) state = State.NotStarted;
	else if (isWorking) state = State.Working;
	else state = State.Chilling;
</script>

<main>
	<Time {state} currentDuration={currentPeriod} {totallyWorked} />

	{pauseDuration}
</main>

<footer>
	<button on:click={switchState}>{isWorking ? 'Pause' : 'Work'}</button>
	<button on:click={shareOrSave} class="outline">{canShare ? 'Share' : 'Save'}</button>
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

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
