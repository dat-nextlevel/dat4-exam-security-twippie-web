<script lang="ts">
	import { Route, Router, useLocation } from "svelte-navigator";
	import { routes } from "../routes";
	import PrivateRoute from "./route/PrivateRoute.svelte";
	import { user } from "../stores/user";
	import { getSignedInUser } from "../authentication/authentication";
	import { onMount } from "svelte";

	// Accepting value for reactivity...?
	async function updateSignedInUser(location: any) {
		user.set(await getSignedInUser());
	}

	onMount(async () => {
		updateSignedInUser("");
	});

	const location = useLocation();
	$: updateSignedInUser($location);
</script>

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
