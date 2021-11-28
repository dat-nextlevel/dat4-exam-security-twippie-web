<script lang="ts">
	import { onMount } from "svelte";
	import { navigate } from "svelte-navigator";
	import Avatar from "../../../components/ui/Avatar.svelte";
	import IconButton from "../../../components/ui/buttons/IconButton.svelte";
	import type { User } from "../../..//types";
	import { api } from "../../../utils/settings";
	import { getColorCssClassFromUsername, getImageUrl } from "../../../utils/util";

	let users: Array<User> = [];

	onMount(async () => {
		const response = await api.get("users");
		users = response.data;
	});
</script>

<div class="mb-8">
	<h2>Users</h2>
	<p>Keep track, view information and perform moderative actions on users.</p>
</div>
<div class="mb-8">
	<div class="flex place-items-center gap-2">
		<span style="width:14px; height:14px;" class="bg-yellow-400 bg-opacity-10 border-2 border-yellow-400 rounded-full" />
		<p>Highlight indicates that a user is muted.</p>
	</div>
</div>
<div class="overflow-x-auto">
	<table class="w-full space-y-6 table-auto">
		<thead class="font-bold">
			<tr class="border-b border-black border-opacity-20">
				<td class="px-4">#</td>
				<td class="px-4 py-4">Username</td>
				<td class="px-4">Email</td>
				<td class="px-4">Role</td>
				<td />
			</tr>
		</thead>
		<tbody class="">
			{#each users as user}
				<tr class=" {user.muted ? 'hover:bg-yellow-400 bg-yellow-400 hover:bg-opacity-20 bg-opacity-10' : 'hover:bg-indigo-400 hover:bg-opacity-10'} cursor-pointer transition-colors" on:click={() => navigate("users/" + user.username)}>
					<td class="px-4"><span>{user.id}</span></td>
					<td class="px-4">
						<span class="flex place-items-center gap-4 py-4">
							<Avatar image={getImageUrl(user.avatar?.id)} username={user.username} size={28} />
							{user.username}
						</span>
					</td>
					<td class="px-4">{user.email}</td>
					<td class="px-4">
						<div class="flex gap-3">
							{#each user.roles as role}
								<span class="text-xs font-bold uppercase bg-opacity-30 bg-{getColorCssClassFromUsername(role)} p-1 px-2 rounded-full">{role}</span>
							{/each}
						</div>
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
