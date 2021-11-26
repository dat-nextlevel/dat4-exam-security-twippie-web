<script lang="ts">
	import { onMount } from "svelte";

	import DefaultLayout from "../components/layout/DefaultLayout.svelte";
	import CreatePost from "../components/ui/post/CreatePost.svelte";
	import PostComponent from "../components/ui/post/Post.svelte";

	import { api } from "../utils/settings";
	import { user } from "../stores/user";
	import type { Post } from "../types";

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

	async function handleCreatedPost(event: any) {
		await fetchPosts();
	}
</script>

<DefaultLayout>
	<div class="header-label">
		<h1>Feed</h1>
	</div>
	{#if $user}
		<div class="mb-8">
			<CreatePost on:created={handleCreatedPost} />
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
			<PostComponent {post} />
		{/each}
	</div>
</DefaultLayout>
