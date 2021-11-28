<script lang="ts">
	import { Route, useLocation } from "svelte-navigator";
	import { routes } from "../routes";
	import PrivateRoute from "./route/PrivateRoute.svelte";
	import { user } from "../stores/user";
	import { getSignedInUser } from "../authentication/authentication";

	// Skip initial double load work-around
	let timesLoaded = 0;

	async function updateSignedInUser(location: any) {
		if (timesLoaded == 0) {
			timesLoaded++;
			return;
		}
		user.set(await getSignedInUser());
	}

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
