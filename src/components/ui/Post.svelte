<script lang="ts">
	import type { Post } from "../../types";
	import dayjs from "dayjs";
	import relativeTime from "dayjs/plugin/relativeTime";
	dayjs.extend(relativeTime);

	export let post: Post;
</script>

<article>
	<div class="flex">
		<div class="p-2">
			<div class="avatar" style="background-image: url({'data:image/png;base64,' + post.author.avatar?.base64 || ''})" />
		</div>
		<div class="flex-1 p-2">
			<header>
				<span class="font-bold">{post.author.username}</span>
				<span> · </span>
				<span>{dayjs().diff(post.createdAt, "week") >= 1 ? dayjs(post.createdAt).format("MMM DD") : dayjs(post.createdAt).fromNow()}</span>
			</header>
			<div>
				{post.content}
				{#if post.image != null}
					<!-- svelte-ignore a11y-missing-attribute -->
					<img class="max-w-full w-full mt-4" src={"data:image/png;base64," + post.image.base64} />
				{/if}
			</div>
			<footer class="mt-4">
				<div class="flex items-center">
					<button class="rounded hover:bg-blue-100 hover:text-blue-500 grid place-items-center mr-2 p-1 transition-colors"><span class="material-icons text-md"> favorite_border </span></button>
					{post.likes.length}
				</div>
			</footer>
		</div>
	</div>
</article>
