<script>
	import { onDestroy } from "svelte";
	import { tweened } from "svelte/motion";
	import { linear } from "svelte/easing";
	import { toast } from "./stores.js";

	export let item;

	console.log(item);

	const progress = tweened(item.initial, { duration: item.duration, easing: linear });
	const close = () => toast.pop(item.id);
	const autoclose = () => {
		if ($progress === 1 || $progress === 0) {
			close();
		}
	};
	let next = item.initial;
	let prev = next;
	let paused = false;

	$: if (next !== item.next) {
		next = item.next;
		prev = $progress;
		paused = false;
		progress.set(next).then(autoclose);
	}

	const pause = () => {
		if (item.pausable && !paused && $progress !== next) {
			progress.set($progress, { duration: 0 });
			paused = true;
		}
	};

	const resume = () => {
		if (paused) {
			const d = item.duration;
			const duration = d - d * (($progress - prev) / (next - prev));
			progress.set(next, { duration }).then(autoclose);
			paused = false;
		}
	};

	const getProps = () => {
		const { props = {}, sendIdTo } = item.component;
		if (sendIdTo) {
			props[sendIdTo] = item.id;
		}
		return props;
	};

	// `progress` has been renamed to `next`; shim included for backward compatibility, to remove in next major
	$: if (typeof item.progress !== "undefined") {
		item.next = item.progress;
	}

	onDestroy(() => {
		if (typeof item.onpop === "function") {
			item.onpop(item.id);
		}
	});
</script>

<div class="_toastItem {item.className}" class:pe={item.pausable} on:mouseenter={pause} on:mouseleave={resume}>
	<div class="_toastMsg" class:pe={item.component}>
		{#if item.component}
			<svelte:component this={item.component.src} {...getProps()} />
		{:else}
			{@html item.msg}
		{/if}
	</div>
	{#if item.dismissable}
		<div class="_toastBtn pe" role="button" tabindex="-1" on:click={close}>✕</div>
	{/if}
	<progress class="_toastBar" value={$progress} />
</div>

<style>
</style>
