<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";

	export let icon: string;
	export let active: boolean = false;
	export let color: string;
	export let size: number = 22;
	export let text: string | number = "";

	let buttonEl;

	const dispatcher = createEventDispatcher();
</script>

<button class={`group relative flex`} type="button" bind:this={buttonEl} on:click={() => dispatcher("click")}>
	<div class="relative">
		<div class={`absolute top-1/2 transition-colors left-1/2 transform -translate-x-1/2 -translate-y-1/2 center rounded-full group-hover:bg-opacity-10 bg-opacity-0 bg-${color} grid place-items-center`} style="width:{size * 1.8}px; height:{size * 1.8}px;" />
		<span class={`material-icons${active ? "" : "-outlined"} flex transition-colors ${active ? `text-${color}` : ""} place-items-center group-hover:text-${color}`} style="font-size:{size}px">{icon}</span>
	</div>
	<span class={`ml-4 ${active ? `text-${color}` : ""} transition-colors group-hover:text-${color}`}>{text}</span>
</button>
