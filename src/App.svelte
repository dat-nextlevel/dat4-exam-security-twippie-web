<script lang="ts">
	import { Router, Route } from "svelte-navigator";
	import Taildwind from "./components/Taildwind.svelte";
	import { user } from "./stores/user";
	import { routes } from "./routes";
	import PrivateRoute from "./components/route/PrivateRoute.svelte";
	import { getSignedInUser } from "./authentication/authentication";
	import { onMount } from "svelte";

	onMount(async () => {
		user.set(await getSignedInUser());
	});
</script>

<main>
	<Router>
		{#each routes as route}
			{#if route.protected}
				<PrivateRoute path={route.path} admin={route.admin}>
					<svelte:component this={route.component} />
				</PrivateRoute>
			{:else}
				<Route path={route.path}>
					<svelte:component this={route.component} />
				</Route>
			{/if}
		{/each}
	</Router>
</main>
<Taildwind />

<style>
</style>
