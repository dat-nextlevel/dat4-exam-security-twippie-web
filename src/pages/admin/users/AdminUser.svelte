<script lang="ts">
	import dayjs from "dayjs";

	import { onMount } from "svelte";

	import { Link, navigate, useParams } from "svelte-navigator";
	import Avatar from "../../../components/ui/Avatar.svelte";
	import type { User } from "../../../types";
	import { api } from "../../../utils/settings";
	import { getColorCssClassFromUsername, getImageUrl } from "../../../utils/util";

	const params = useParams();

	let currentUser: User;

	async function fetchUser(username: string) {
		try {
			const response = await api.get("users/username/" + $params.username);
			currentUser = response.data;
		} catch (error) {
			console.log(error);
		}
	}

	onMount(async () => {
		if ($params.username) {
			fetchUser($params.username);
		}
	});

	async function deleteUser() {
		try {
			const response = await api.delete(`users/${currentUser.username}`);
			navigate("/admin/users");
		} catch (error) {}
	}

	async function muteUser() {
		try {
			const response = await api.post(`users/${currentUser.username}/mute`);
			currentUser = response.data;
		} catch (error) {}
	}
</script>

{#if currentUser}
	<div>
		<section class="flex place-items-center gap-8 border-b pb-8">
			<Avatar image={getImageUrl(currentUser.avatar?.id)} size={64} username={currentUser.username} />
			<div>
				<span class="font-bold text-xl">{currentUser.username}</span>
				<div class="flex gap-3">
					{#each currentUser.roles as role}
						<span class="text-xs font-bold uppercase bg-opacity-30 bg-{getColorCssClassFromUsername(role)} p-1 px-2 rounded-full">{role}</span>
					{/each}
				</div>
			</div>
			<Link to="/profile/{currentUser.username}" class="ml-auto"><button class="bttn">Profile</button></Link>
		</section>
		{#if currentUser.muted}
			<div class="bg-yellow-500 bg-opacity-10 text-center text-yellow-900 p-2">USER IS CURRENTLY MUTED</div>
		{/if}
		<section class="my-8">
			<h2>Additional information</h2>
			<div class="flex gap-4 flex-col">
				<div class="flex gap-8 py-2">
					<span class="flex gap-2 place-items-center">
						<span class="material-icons-outlined">email</span>
						<p>{currentUser.email}</p>
					</span>
					<span class="flex gap-2 place-items-center">
						<span class="material-icons-outlined">event</span>
						<p>Joined {dayjs(currentUser.createdAt).format("MMM DD YYYY")}</p>
					</span>
					<span class="flex gap-2 place-items-center">
						<span class="material-icons-outlined">thumb_up</span>
						<p>Liked {currentUser.likedPosts.length} post(s)</p>
					</span>
				</div>
			</div>
		</section>
		<section class="my-8">
			<h2>Posts</h2>
			<p>See all {currentUser.posts.length} post(s), by going to the <span class="text-indigo-600"><Link to="/profile/{currentUser.username}">{currentUser.username}'s profile.</Link></span></p>
		</section>
		<section class="my-8">
			<h2>Moderation Actions</h2>
			<p>These actions will influence {currentUser.username}'s user experience.</p>
			<div class="flex gap-4 mt-4">
				<button class="bttn-warning" on:click={muteUser}>{currentUser.muted ? "Unmute" : "Mute"} user</button>
				<button class="bttn-danger" on:click={deleteUser}>Delete user</button>
			</div>
		</section>
	</div>
{/if}
