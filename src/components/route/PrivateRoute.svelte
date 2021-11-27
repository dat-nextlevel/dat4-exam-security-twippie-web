<script lang="ts">
	import { Route } from "svelte-navigator";
	import PrivateRouteGuard from "./PrivateRouteGuard.svelte";

	export let path;
	export let exact;
	export let admin;
	console.log(admin);
</script>

<Route {path} {exact} let:params let:location let:navigate>
	<PrivateRouteGuard {admin}>
		<slot {params} {location} {navigate} />
	</PrivateRouteGuard>
</Route>
