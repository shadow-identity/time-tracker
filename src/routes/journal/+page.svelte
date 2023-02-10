<script lang="ts">
	import { dev } from '$app/environment';
	import { PRINT_FORMAT, State, STATE_SYMBOL } from '$lib/constants';
	import { getPauseDuration, getWorkDuration, readAllDays } from '$lib/workRecords';
	import { DateTime } from 'luxon';
</script>

<svelte:head>
	<title>Time Tracker: Journal</title>
	<meta name="description" content="List of all the time stamps" />
</svelte:head>

<h1>Journal</h1>
<main>
	{#await readAllDays() then days}
		{#each days.reverse() as day, index}
			<details open={!index}>
				<summary>
					{day[0]}
				</summary>
				<hgroup>
					<h5>Summary</h5>
					<p>
						<span>{STATE_SYMBOL[State.Working]}&nbsp;Worked:&nbsp;{getWorkDuration(day[1])}</span>
						<span>{STATE_SYMBOL[State.Chilling]}&nbsp;Chilled:&nbsp;{getPauseDuration(day[1])}</span
						>
					</p>
				</hgroup>
				<h5>Details</h5>
				<ul>
					{#each day[1] as workRecord, index}
						<li
							data-type={workRecord.isWorking ? 'work' : 'chill'}
							aria-label={workRecord.isWorking ? 'work started' : 'pause started'}
						>
							<span
								>{workRecord.timestamp.toLocaleString(
									DateTime[dev ? 'TIME_WITH_SECONDS' : 'TIME_SIMPLE']
								)}</span
							>
							{#if index < day[1].length - 1}
								<p
									class="duration"
									aria-label={workRecord.isWorking ? 'work duration' : 'pause duration'}
								>
									{day[1][index + 1].timestamp.diff(day[1][index].timestamp).toFormat(PRINT_FORMAT)}
								</p>
							{/if}
						</li>
					{/each}
				</ul>
			</details>
		{/each}
	{/await}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	@media (max-width: 300rem) {
		main {
			padding-left: 1rem;
			padding-right: 1rem;
		}
	}

	details {
		width: 100%;
	}

	.duration {
		margin-bottom: 0;
	}

	.duration::before {
		content: '⏳ ';
		font-size: smaller;
	}

	li[data-type='work'] {
		list-style: work;
		background-color: var(--table-row-stripped-background-color);
	}

	li[data-type='chill'] {
		list-style: chill;
	}

	@counter-style work {
		system: cyclic;
		suffix: ' ';
		symbols: '🛠️';
	}

	@counter-style chill {
		system: cyclic;
		suffix: ' ';
		symbols: '☕';
	}
</style>
