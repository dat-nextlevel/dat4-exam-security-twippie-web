<script>
	import { user } from "../../stores/user";

	import SideNavigation from "../ui/navigation/SideNavigation.svelte";
</script>

<div class="container">
	<div class="flex">
		<SideNavigation />
		<div class="content w-full mr-auto">
			<slot />
		</div>
		<div class="flex-1" />
	</div>
</div>
