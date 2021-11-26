<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let icon: string;
	export let active: boolean = false;
	export let color: string;
	export let size: string = "xl";
	export let text: string | number = "";

	const dispatcher = createEventDispatcher();
</script>

<button class={`group relative flex`} type="button" on:click={() => dispatcher("click")}>
	<div class="relative">
		<div class={`absolute top-1/2 transition-colors left-1/2 transform -translate-x-1/2 -translate-y-1/2 center rounded-full group-hover:bg-opacity-10 bg-opacity-0 bg-${color} grid place-items-center`} style="width:42px; height:42px;" />
		<span class={`material-icons${active ? "" : "-outlined"} text-${size} flex transition-colors ${active ? `text-${color}` : ""} place-items-center group-hover:text-${color}`}>{icon}</span>
	</div>
	<span class={`ml-4 ${active ? `text-${color}` : ""} transition-colors group-hover:text-${color}`}>{text}</span>
</button>
