<script lang="ts">
	import { onMount } from "svelte";

	import DefaultLayout from "../components/layout/DefaultLayout.svelte";
	import CreatePost from "../components/ui/post/CreatePost.svelte";
	import PostComponent from "../components/ui/post/Post.svelte";

	import { api } from "../utils/settings";
	import { user } from "../stores/user";
	import type { Post, User } from "../types";
	import { getSignedInUser } from "../authentication/authentication";
	import { useParams } from "svelte-navigator";
	import Avatar from "../components/ui/Avatar.svelte";
	import { getColorCssClassFromUsername, getImageUrl } from "../utils/util";
	import Username from "../components/ui/Username.svelte";
	import dayjs from "dayjs";
	import { success } from "../components/ui/toast";

	let routeParams = useParams();
	let currentProfile: User;

	let posts: Array<Post> = [];

	async function updateUser(_routeParams) {
		if (_routeParams.profile) {
			try {
				const response = await api.get("users/username/" + _routeParams.profile);
				currentProfile = response.data;
				posts = currentProfile.posts;
			} catch (error) {
				console.log(error);
			}
		}
	}

	$: updateUser($routeParams);

	onMount(async () => {
		if ($routeParams.profile) {
			try {
				const response = await api.get("users/username/" + $routeParams.profile);
				currentProfile = response.data;
				posts = currentProfile.posts;
			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				const response = await api.get<Array<Post>>("posts", { params: { sortBy: "createdAt", sortDirection: "desc" } });
				posts = response.data;
			} catch (error) {
				console.log(error);
			}
		}
	});

	async function createPost(event: any) {
		const post = event.detail as Post;
		posts = [post, ...posts];

		$user = await getSignedInUser();
	}

	async function deletePost(event: any) {
		const post = event.detail as Post;
		posts = posts.filter((p) => p.id != post.id);

		$user = await getSignedInUser();
	}

	async function likePost(event: any) {
		const post = event.detail.post as Post;
		const isLiked = event.detail.liked;

		let likes: any = new Set(isLiked ? [...post.likes, $user.username] : post.likes.filter((f) => f != $user.username));
		likes = [...likes];

		posts = posts.map((p) => (p.id === post.id ? { ...p, likes } : p));
	}
</script>

<DefaultLayout>
	<div class="header-label">
		<h1>Feed</h1>
	</div>
	{#if !currentProfile}
		<div class="mb-8">
			{#if $user}
				<CreatePost on:created={createPost} />
			{/if}
		</div>
	{:else}
		<div class="mb-8">
			<div style="height:175px;" class="w-full rounded bg-{getColorCssClassFromUsername(currentProfile.username)}" />
			<div class="flex flex-col gap-2 -my-12">
				<Avatar className="border-8 border-white" image={getImageUrl(currentProfile.avatar?.id)} size={128} username={currentProfile.username} />
			</div>
			<div class="mt-14 flex border-b pb-4">
				<span class="text-xl">
					<Username>{currentProfile.username}</Username>
				</span>
				<span class="ml-auto">Joined {dayjs(currentProfile.createdAt).format("MMMM YYYY")}</span>
			</div>
			<h2 class="mt-8">Posts</h2>
			<p class="text-sm">{currentProfile.posts.length} post(s).</p>
		</div>
	{/if}
	<div>
		{#if posts.length == 0}
			<div class="">
				<span class="material-icons text-4xl"> try </span>
				<h2>An empty space.</h2>
				<p>Nobody has posted anything... yet!</p>
			</div>
		{/if}
		{#each posts as post}
			<PostComponent {post} on:deleted={deletePost} on:liked={likePost} doesLike={post.likes.find((u) => u == $user?.username) != null} isOwner={post.author.username == $user?.username || $user?.roles.find((r) => r == "ADMIN") != null} />
		{/each}
	</div>
</DefaultLayout>
