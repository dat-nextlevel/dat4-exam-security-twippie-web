<script lang="ts">
	import dayjs from "dayjs";
	import { onMount } from "svelte";
	import { navigate } from "svelte-navigator";
	import Avatar from "../../components/ui/Avatar.svelte";
	import IconButton from "../../components/ui/buttons/IconButton.svelte";
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
	<table class="w-full space-y-6 table-auto">
		<thead class="font-bold">
			<tr>
				<td class="px-4">#</td>
				<td class="px-4">Username</td>
				<td class="px-4">Email</td>
				<td class="px-4">Role</td>
				<td />
			</tr>
		</thead>
		<tbody class="">
			{#each users as user}
				<tr class="hover:bg-opacity-10 hover:bg-indigo-400 cursor-pointer transition-colors" on:click={() => navigate("users/" + user.username)}>
					<td class="px-4"><span>{user.id}</span></td>
					<td class="px-4">
						<span class="flex place-items-center gap-4 py-4">
							<Avatar image={getImageUrl(user.avatar?.id)} username={user.username} size={28} />
							{user.username}
						</span>
					</td>
					<td class="px-4">{user.email}</td>
					<td class="px-4">
						<span class="flex gap-2">
							{#each user.roles as role}
								<span>{role}</span>
							{/each}
						</span>
					</td>
					<td class="px-4">
						<span class="flex gap-2 place-items-center">
							<IconButton icon="info" color="indigo-500" />
						</span>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
