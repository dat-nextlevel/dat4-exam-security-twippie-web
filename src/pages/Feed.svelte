<script lang="ts">
	import { onMount } from "svelte";

	import DefaultLayout from "../components/layout/DefaultLayout.svelte";
	import PostComponent from "../components/ui/Post.svelte";

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
	<h1>Feed</h1>
	{#each posts as post}
		<PostComponent {post} />
	{/each}
</DefaultLayout>
