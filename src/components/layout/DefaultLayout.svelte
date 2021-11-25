<script>
	import SideNavigation from "../ui/navigation/SideNavigation.svelte";
</script>

<div class="container mt-12">
	<div class="flex">
		<SideNavigation />
		<div class="content w-full mr-auto">
			<slot />
		</div>
	</div>
</div>
