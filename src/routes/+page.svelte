<script>
	import Counter from './Counter.svelte';
</script>

<svelte:head>
	<title>Time Tracker</title>
	<meta name="description" content="App to track working and rest time" />
</svelte:head>

<section>
	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
