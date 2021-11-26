<script lang="ts">
	import { onMount } from "svelte";

	import { useNavigate, useLocation } from "svelte-navigator";
	import { getSignedInUser } from "../../authentication/authentication";
	import { user } from "../../stores/user";

	const navigate = useNavigate();
	const location = useLocation();

	onMount(async () => {
		const _user = await getSignedInUser();
		if (!_user) {
			navigate("/", {
				state: { from: $location.pathname },
				replace: true,
			});
		}
	});
</script>

{#if $user}
	<slot />
{/if}
