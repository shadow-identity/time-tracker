<script lang="ts">
	import { getPauseDuration, getWorkDuration, PRINT_FORMAT, readAllDays } from '$lib/workRecords';
	import { DateTime } from 'luxon';
</script>

<svelte:head>
	<title>Time Tracker: Journal</title>
	<meta name="description" content="List of all the time stamps" />
</svelte:head>

<h1>Journal</h1>
<main>
	{#await readAllDays() then days}
		{#each days as day}
			<header>
				<h2>{day[0]}</h2>
				<p>
					<span>Worked:&nbsp;{getWorkDuration(day[1])}</span>
					<span>Chilled:&nbsp;{getPauseDuration(day[1])}</span>
				</p>
			</header>
			<ul>
				{#each day[1] as workRecord, index}
					<li class="duration_item">
						<i>{workRecord.timestamp.toLocaleString(DateTime.TIME_WITH_SECONDS)}</i>
						{#if index < day[1].length - 1}
							<!-- todo: don't use unnecessary list here -->
							<ul class="duration">
								<li data-type={workRecord.isWorking ? 'work' : 'chill'}>
									<span class="secondary"
										>{day[1][index + 1].timestamp
											.diff(day[1][index].timestamp)
											.toFormat(PRINT_FORMAT)}
									</span>
								</li>
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
		{/each}
	{/await}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.duration {
		margin-top: 0;
		font-size: x-large;
		/* todo: fix with list-style? */
		margin-left: 1rem;
	}

	.duration_item {
		list-style: repeating;
	}

	li[data-type='work'] {
		list-style: work;
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

	@counter-style repeating {
		system: cyclic;
		suffix: ' ';
		symbols: '✏️';
	}
</style>
