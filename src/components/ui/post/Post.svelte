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
	import Dropdown from "sv-bootstrap-dropdown";
	import { createEventDispatcher, onMount } from "svelte";
	import { Link } from "svelte-navigator";
	dayjs.extend(relativeTime);

	const dispatcher = createEventDispatcher();

	export let post: Post;
	export let doesLike;

	let dropdownTrigger;

	async function handleLike(_post: Post) {
		if ($user) {
			const response = await api.put(`posts/${_post.id}/like`, { isLiked: !doesLike });
			dispatcher("liked", { post: response.data as Post, liked: !doesLike });
		}
	}

	export let isOwner: boolean;

	async function deletePost() {
		try {
			await api.delete(`posts/${post.id}`);
			dispatcher("deleted", post);
		} catch (error) {}
	}
</script>

<article>
	<div class="flex">
		<div class="p-2">
			<Avatar image={getImageUrl(post.author.avatar?.id)} username={post.author.username} />
		</div>
		<div class="flex-1 p-2">
			<header class="flex gap-2 place-items-center">
				<Link to="/profile/{post.author.username}"><Username>{post.author.username}</Username></Link>
				<span> · </span>
				<span>{dayjs().diff(post.createdAt, "week") >= 1 ? dayjs(post.createdAt).format("MMM DD") : dayjs(post.createdAt).fromNow()}</span>
				{#if isOwner}
					<span class="ml-auto text-black" bind:this={dropdownTrigger}>
						<Dropdown triggerElement={dropdownTrigger}>
							<IconButton icon="more_horiz" color="indigo-500" size={18} />
							<div slot="DropdownMenu" class="dropdown-content">
								<button on:click={deletePost} type="button" class="dropdown-link hover:bg-opacity-10 text-red-500 hover:bg-red-500 hover:text-red-500">
									<span class="material-icons-outlined ">delete</span>
									<span class="">Delete post</span>
								</button>
							</div>
						</Dropdown>
					</span>
				{/if}
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
					<IconButton on:click={() => handleLike(post)} icon="thumb_up" active={doesLike} color="green-600" text={post.likes.length} />
				</div>
			</footer>
		</div>
	</div>
</article>
