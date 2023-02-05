<script context="module" lang="ts">
	export enum State {
		'NotStarted',
		'Working',
		'Chilling'
	}
</script>

<script lang="ts">
	export let state: State;
	export let currentDuration: string;
	export let totallyWorked: string;
</script>

{#if state === State.NotStarted}
	<h1>Time to start working!</h1>
{:else}
	<h1>{state === State.Working ? 'Working' : 'Chilling'} <span>{currentDuration}</span></h1>

	<h3>
		Totally worked today: {totallyWorked}
	</h3>
{/if}

<style>
	h1 span {
		font-size: smaller;
	}
</style>
