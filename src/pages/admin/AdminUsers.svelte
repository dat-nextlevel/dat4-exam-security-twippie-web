<script lang="ts">
	import { onMount } from "svelte";
	import Avatar from "../../components/ui/Avatar.svelte";
	import type { User } from "../../types";
	import { api } from "../../utils/settings";
	import { getImageUrl } from "../../utils/util";

	let users: Array<User> = [];

	onMount(async () => {
		const response = await api.get("users");
		users = response.data;
	});
</script>

<div class="overflow-x-auto">
	<table class="w-full">
		<tbody class="">
			{#each users as user}
				<tr class="">
					<td>{user.id}</td>
					<td>
						<span class="flex place-items-center gap-4 py-2">
							<Avatar image={getImageUrl(user.avatar?.id)} username={user.username} size={28} />
							{user.username}
						</span>
					</td>
					<td>{user.email}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
