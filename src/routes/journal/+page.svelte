<script lang="ts">
	import { getPauseDuration, getWorkDuration, readAllDays } from '$lib/workRecords';
	import { DateTime } from 'luxon';
	// const days = readAllDays()
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
				{#each day[1] as workRecord}
					<li data-type={workRecord.isWorking ? 'work' : 'chill'}>
						<span>{workRecord.timestamp.toLocaleString(DateTime.TIME_WITH_SECONDS)}</span>
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
</style>
