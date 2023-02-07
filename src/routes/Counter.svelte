<script lang="ts">
	import { DateTime } from 'luxon';
	import { browser } from '$app/environment';
	import Time, { State } from './Time.svelte';
	import { onMount } from 'svelte';
	import {
		type WorkRecord,
		addWorkRecord,
		restoreWorkRecords,
		readWorkRecords,
		PRINT_FORMAT,
		getWorkDuration,
		getPauseDuration
	} from '$lib/workRecords';

	let isWorking = false;
	let workRecords: WorkRecord[] = [];

	let currentPeriod = '';
	let totallyWorked = '';

	const readData = async () => {
		workRecords = restoreWorkRecords(await readWorkRecords());
		if (workRecords.length) isWorking = workRecords.at(-1)?.isWorking ?? false;
	};

	onMount(() => {
		readData();
	});

	const switchState = () => {
		isWorking = !isWorking;
		workRecords = addWorkRecord(workRecords, isWorking);
	};

	const canShare = browser && !!navigator.canShare?.({ text: '' });

	const prepareExportString = () => {
		const firstWorkingTime = workRecords
			.find((workRecord) => workRecord.isWorking)
			?.timestamp.toFormat(PRINT_FORMAT);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore it does not aware about findLast O_o
		const lastWorkingTime: WorkRecord = workRecords.findLast(
			(workRecord: WorkRecord) => workRecord.isWorking
		);
		const pauseDuration = getPauseDuration(workRecords);
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
				console.log('shared', text);
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

			// Create a new idb record for a new day
			if (workRecords[0].timestamp.day !== now.day) {
				resetRecords();
				return;
			}

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			currentPeriod = now.diff(workRecords.at(-1)!.timestamp).toFormat(PRINT_FORMAT);

			totallyWorked = getWorkDuration(workRecords);
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
		resetRecords();
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
