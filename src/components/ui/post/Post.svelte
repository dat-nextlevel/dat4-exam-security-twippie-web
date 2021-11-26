<script lang="ts">
	import type { Post } from "../../../types";
	import dayjs from "dayjs";
	import relativeTime from "dayjs/plugin/relativeTime";
	import IconButton from "../buttons/IconButton.svelte";
	import Avatar from "../Avatar.svelte";
	import { getImageUrl } from "../../../utils/util";
	import { user } from "../../../stores/user";
	import { api } from "../../../utils/settings";
	import Username from "../Username.svelte";
	dayjs.extend(relativeTime);

	export let post: Post;

	async function handleLike(post: Post) {
		if ($user) {
			const doesLike = $user.likedPosts?.filter((lp) => lp.id == post.id).length > 0;
			await api.put(`posts/${post.id}/like`, { isLiked: !doesLike });
		}
	}
</script>

<article>
	<div class="flex">
		<div class="p-2">
			<Avatar image={getImageUrl(post.author.avatar?.id || null)} />
		</div>
		<div class="flex-1 p-2">
			<header>
				<Username>{post.author.username}</Username>
				<span> · </span>
				<span>{dayjs().diff(post.createdAt, "week") >= 1 ? dayjs(post.createdAt).format("MMM DD") : dayjs(post.createdAt).fromNow()}</span>
			</header>
			<div>
				{post.content}
				{#if post.image != null}
					<!-- svelte-ignore a11y-missing-attribute -->
					<img class="max-w-full w-full mt-3" src={getImageUrl(post.image?.id || null)} />
				{/if}
			</div>
			<footer class="mt-3">
				<div class="flex items-center">
					<IconButton on:click={() => handleLike(post)} icon="thumb_up" active={$user != null && $user.likedPosts?.filter((lp) => lp.id == post.id).length > 0} color="green-600" text={post.likes.length} />
				</div>
			</footer>
		</div>
	</div>
</article>
