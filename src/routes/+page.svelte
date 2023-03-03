<script>
	import { dev } from '$app/environment';
	import Counter from './Counter.svelte';
	import Title from './Title.svelte';
</script>

<svelte:head>
	<Title />
	<meta name="description" content="App to track working and rest time" />
</svelte:head>

<div>
	<Counter />
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
