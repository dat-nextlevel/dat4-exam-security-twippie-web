<script lang="ts">
	import { onMount } from "svelte";

	import DefaultLayout from "../components/layout/DefaultLayout.svelte";
	import PostComponent from "../components/ui/post/Post.svelte";

	import { api } from "../settings";
	import type { Post } from "../types";

	let posts: Array<Post> = [];

	onMount(async () => {
		try {
			const response = await api.get<Array<Post>>("posts", { params: { sortBy: "createdAt", sortDirection: "desc" } });
			posts = response.data;
		} catch (error) {
			console.log(error);
		}
	});
</script>

<DefaultLayout>
	<div class="header-label">
		<h1>Feed</h1>
	</div>
	<div>
		{#if posts.length == 0}
			<div class="text-center">
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
