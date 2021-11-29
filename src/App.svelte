<script lang="ts">
	import { Router } from "svelte-navigator";
	import Taildwind from "./components/Taildwind.svelte";
	import { onMount } from "svelte";
	import Main from "./components/Main.svelte";
	import { SvelteToast } from "@zerodevx/svelte-toast";
</script>

<main>
	<Router primary={false}>
		<Main />
	</Router>
</main>
<Taildwind />
<SvelteToast />

<style>
</style>
