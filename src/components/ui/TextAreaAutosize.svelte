<script lang="ts">
	import App from "../../App.svelte";
	import CreatePost from "./post/CreatePost.svelte";

	export let value = "";
	export let minRows = 1;
	export let maxRows;

	export let props;
	export let className = "";

	$: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;
</script>

<div class="textarea-container">
	<pre aria-hidden="true" style="min-height: {minHeight}; max-height: {maxHeight}">{value + '\n'}</pre>

	<textarea {...props} class={className} bind:value />
</div>

<style>
	.textarea-container {
		position: relative;
	}

	pre,
	textarea {
		font-family: inherit;
		box-sizing: border-box;
		line-height: 1.2;
		overflow: hidden;
	}

	textarea {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		resize: none;
	}
</style>
