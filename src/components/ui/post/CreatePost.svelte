<script lang="ts">
	import { user } from "../../../stores/user";
	import { api } from "../../../utils/settings";
	import { getImageUrl } from "../../../utils/util";

	import Avatar from "../Avatar.svelte";
	import IconButton from "../buttons/IconButton.svelte";
	import TextArea from "../TextAreaAutosize.svelte";

	let content: string;

	let image;
	let showImage = false;
	let input;

	async function handlePost(event: Event) {
		const formData = new FormData();
		formData.append("content", content);
		if (showImage) formData.append("image", input?.files[0]);

		console.log(formData);

		api.post("posts", formData, { headers: { "Content-Type": "multipart/form-data" } });
	}

	function handleInputChange() {
		const file = input.files[0];

		if (file) {
			showImage = true;
			const reader = new FileReader();
			reader.addEventListener("load", function () {
				image.setAttribute("src", reader.result);
			});
			reader.readAsDataURL(file);
			return;
		}

		showImage = false;
	}
</script>

<form on:submit|preventDefault={handlePost}>
	<div class="p-4 border border-indigo-200 rounded">
		<div class="flex">
			<div class="pr-4">
				<Avatar size={60} image={getImageUrl($user?.avatar?.id || null)} />
			</div>
			<div class="flex-1">
				<TextArea bind:value={content} maxRows="15" props={{ placeholder: "What's happening?", required: true }} className="focus:outline-none border-b border-opacity-0 focus:border-opacity-100" />
				{#if showImage}
					<div class="pt-2">
						<img bind:this={image} src="" alt="Preview" />
					</div>
				{/if}
				<div class="flex pt-2 place-items-end">
					<div class="flex">
						<input hidden type="file" bind:this={input} on:change={handleInputChange} name="image" />
						<IconButton on:click={() => input.click()} icon="add_photo_alternate" size="2xl" color="indigo-600" />
					</div>
					<button type="submit" class="bttn ml-auto">Post</button>
				</div>
			</div>
		</div>
	</div>
</form>
