<script lang="ts">
	import { spring } from 'svelte/motion';
	import { DateTime, Duration } from 'luxon';
	import { browser } from '$app/environment';

	let count = 0;
	const displayed_count = spring();
	$: displayed_count.set(count);
	$: offset = modulo($displayed_count, 1);

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}

	type WorkRecord = { isWorking: boolean; timestamp: DateTime };

	let isWorking = false;
	let workRecords: WorkRecord[] = [];
	const switchState = () => {
		isWorking = !isWorking;
		workRecords = [...workRecords, { isWorking, timestamp: DateTime.now() }];
	};

	let currentPeriod = '';
	let totallyWorked = '';

	const updateCurrentPeroid = () => {
		if (!browser) return;
		if (workRecords.length) {
			const now = DateTime.now();
			currentPeriod = now.diff(workRecords.at(-1)!.timestamp).toFormat('hh:mm:ss');

			totallyWorked = workRecords
				.reduce((duration, workRecord, currentIndex) => {
					if (workRecord.isWorking) return duration;
					const upperTime =
						currentIndex === workRecords.length - 1 ? now : workRecords.at(-1)?.timestamp;
					return duration.plus(upperTime?.diff(workRecords.at(-2)!.timestamp));
				}, Duration.fromMillis(0))
				.toFormat('hh:mm:ss');
		}
		window.requestAnimationFrame(updateCurrentPeroid);
	};

	browser && window.requestAnimationFrame(updateCurrentPeroid);
	/* 
	true, 10:00
	false, 12:00
	true, 13:00
	now: 13:30

	0) 0:00
	1) 2:00
	2) 2:00
	3) 2:30
	*/
</script>

{#if !workRecords.length}
	<h1>Time to work!</h1>
{:else if workRecords.at(-1)?.isWorking}
	<h1>Working...</h1>
	<h2>{currentPeriod}</h2>
{:else}
	<h1>Chilling...</h1>
	<h2>{currentPeriod}</h2>
{/if}

<h3>
	Totally worked today:
	{totallyWorked}
</h3>

<button on:click={switchState}>{isWorking ? 'Pause' : 'Work'}</button>
<!-- {#each workRecords as workRecord, index}
	{#if !workRecord.isWorking}
		<p>
			{`${workRecords
				.at(-2)
				.timestamp.toLocaleString(DateTime.TIME_SIMPLE)} - ${workRecord.timestamp.toLocaleString(
				DateTime.TIME_SIMPLE
			)} | ${workRecord.timestamp.diff(workRecords.at(index - 1).timestamp).toFormat('hh:mm')}`}
		</p>
	{/if}
{/each} -->
<div class="counter">
	<button on:click={() => (count -= 1)} aria-label="Decrease the counter by one">
		<svg aria-hidden="true" viewBox="0 0 1 1">
			<path d="M0,0.5 L1,0.5" />
		</svg>
	</button>

	<div class="counter-viewport">
		<div class="counter-digits" style="transform: translate(0, {100 * offset}%)">
			<strong class="hidden" aria-hidden="true">{Math.floor($displayed_count + 1)}</strong>
			<strong>{Math.floor($displayed_count)}</strong>
		</div>
	</div>

	<button on:click={() => (count += 1)} aria-label="Increase the counter by one">
		<svg aria-hidden="true" viewBox="0 0 1 1">
			<path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1" />
		</svg>
	</button>
</div>

<style>
	.counter {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
	}

	.counter button {
		width: 2em;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		background-color: transparent;
		touch-action: manipulation;
		font-size: 2rem;
	}

	.counter button:hover {
		background-color: var(--color-bg-1);
	}

	svg {
		width: 25%;
		height: 25%;
	}

	path {
		vector-effect: non-scaling-stroke;
		stroke-width: 2px;
		stroke: #444;
	}

	.counter-viewport {
		width: 8em;
		height: 4em;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--color-theme-1);
		font-size: 4rem;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.hidden {
		top: -100%;
		user-select: none;
	}
</style>
