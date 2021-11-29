<script lang="ts">
	import { Router } from "svelte-navigator";
	import Taildwind from "./components/style/Taildwind.svelte";
	import { onMount } from "svelte";
	import Main from "./components/Main.svelte";
	import { SvelteToast } from "./external-packages/svelte-toast";
</script>

<main>
	<Router primary={false}>
		<Main />
	</Router>
</main>
<SvelteToast />

<Taildwind />

<style>
</style>
