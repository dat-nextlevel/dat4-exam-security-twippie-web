<script lang="ts">
	import { onMount } from "svelte";

	import { useNavigate, useLocation } from "svelte-navigator";
	import { user } from "../../stores/user";

	const navigate = useNavigate();
	const location = useLocation();

	export let admin;

	onMount(async () => {
		if (!$user) {
			navigate("/", {
				state: { from: $location.pathname },
				replace: true,
			});
			return;
		}
		if (admin && $user?.roles.find((r) => r == "ADMIN") == null) {
			navigate("/", {
				state: { from: $location.pathname },
				replace: true,
			});
			return;
		}
	});
</script>

{#if $user}
	<slot />
{/if}
