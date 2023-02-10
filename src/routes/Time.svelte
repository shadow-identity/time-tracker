<script context="module" lang="ts">
</script>

<script lang="ts">
	import { State, STATE_SYMBOL } from '$lib/constants';
	export let state: State;
	export let currentDuration: string;
	export let totallyWorked: string;
</script>

<span aria-hidden="true" class="state-symbol">{STATE_SYMBOL[state]}</span>
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

	h3 {
		text-align: center;
	}

	.state-symbol {
		margin: 0 auto;
		font-size: 5rem;
	}
</style>
