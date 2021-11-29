<script>
	import { fade, fly } from "svelte/transition";
	import { flip } from "svelte/animate";
	import { toast } from "./stores.js";
	import ToastItem from "./ToastItem.svelte";

	export let options = {};
	export let target = "default";

	$: toast._init(target, options);

	let items;
	$: items = $toast.filter((i) => i.target === target);

	const getCss = (theme) => Object.keys(theme).reduce((a, c) => `${a}${c}:${theme[c]};`, "");
</script>

<ul class="_toastContainer">
	{#each items as item (item.id)}
		<li in:fly={item.intro} out:fade animate:flip={{ duration: 200 }} style={getCss(item.theme)}>
			<ToastItem {item} />
		</li>
	{/each}
</ul>

<style>
</style>
