<script lang="ts">
	import { Router } from "svelte-navigator";
	import Taildwind from "./components/Taildwind.svelte";
	import { onMount } from "svelte";
	import Main from "./components/Main.svelte";
</script>

<main>
	<Router>
		<Main />
	</Router>
</main>
<Taildwind />

<style>
</style>
