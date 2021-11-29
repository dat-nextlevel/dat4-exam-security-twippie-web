<script lang="ts">
	import { Route, useLocation } from "svelte-navigator";
	import PrivateRoute from "./route/PrivateRoute.svelte";
	import { user } from "../stores/user";
	import { getSignedInUser } from "../authentication/authentication";
	import Feed from "../pages/Feed.svelte";
	import Settings from "../pages/Settings.svelte";
	import Admin from "../pages/admin/Admin.svelte";
	import { success } from "./ui/toast";

	// Skip initial double load work-around
	let timesLoaded = 0;

	let loadingSignedInUser = true;

	async function updateSignedInUser(location: any) {
		// Initial mount...
		if (timesLoaded == 0) {
			timesLoaded++;
			return;
		}

		const _user = await getSignedInUser();

		if (!$user && _user) {
			success(`Welcome back ${_user.username}`);
		}

		user.set(_user);
		loadingSignedInUser = false;
	}

	const location = useLocation();
	$: updateSignedInUser($location);
</script>

{#if !loadingSignedInUser}
	<Route path="/">
		<Feed />
	</Route>
	<Route path="/profile/*profile">
		<Feed />
	</Route>

	<PrivateRoute path="/settings">
		<Settings />
	</PrivateRoute>

	<PrivateRoute path="/admin/*adminRoute" admin={true}>
		<Admin />
	</PrivateRoute>
{/if}
