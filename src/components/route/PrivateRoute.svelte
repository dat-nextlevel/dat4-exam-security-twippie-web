<script lang="ts">
	import { Route } from "svelte-navigator";
	import PrivateRouteGuard from "./PrivateRouteGuard.svelte";

	export let path;
	export let admin = false;
</script>

<Route {path} let:params let:location let:navigate>
	<PrivateRouteGuard {admin}>
		<slot {params} {location} {navigate} />
	</PrivateRouteGuard>
</Route>
