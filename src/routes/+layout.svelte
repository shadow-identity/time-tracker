<script>
	import Header from './Header.svelte';
	import './styles.css';
	import '@picocss/pico';
</script>

<div class="app">
	<Header />
	<slot />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100svh;
	}
</style>
