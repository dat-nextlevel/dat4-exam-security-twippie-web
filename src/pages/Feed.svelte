<script lang="ts">
	import { onMount } from "svelte";

	import DefaultLayout from "../components/layout/DefaultLayout.svelte";
	import CreatePost from "../components/ui/post/CreatePost.svelte";
	import PostComponent from "../components/ui/post/Post.svelte";

	import { api } from "../utils/settings";
	import { user } from "../stores/user";
	import type { Post } from "../types";
	import { getSignedInUser } from "../authentication/authentication";
	import Username from "../components/ui/Username.svelte";

	let posts: Array<Post> = [];

	async function fetchPosts() {
		try {
			const response = await api.get<Array<Post>>("posts", { params: { sortBy: "createdAt", sortDirection: "desc" } });
			posts = response.data;
		} catch (error) {
			console.log(error);
		}
	}

	onMount(async () => {
		await fetchPosts();
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

		console.log(posts);

		//$user = await getSignedInUser();
	}
</script>

<DefaultLayout>
	<div class="header-label">
		<h1>Feed</h1>
	</div>
	{#if $user}
		<div class="mb-8">
			<CreatePost on:created={createPost} />
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
