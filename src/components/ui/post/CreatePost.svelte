<script lang="ts">
	import { user } from "../../../stores/user";
	import { getImageUrl } from "../../../utils/util";

	import Avatar from "../Avatar.svelte";
	import IconButton from "../buttons/IconButton.svelte";
	import TextArea from "../TextAreaAutosize.svelte";
</script>

<form>
	<div class="p-4 border border-indigo-200 rounded">
		<div class="flex">
			<div class="">
				<Avatar size={60} image={getImageUrl($user.avatar?.id || null)} />
			</div>
			<div class="flex-1">
				<TextArea maxRows="15" props={{ placeholder: "What's happening?", class: "" }} className="focus:outline-none border-b border-opacity-0 focus:border-opacity-100" />
				<div class="flex pt-2 place-items-end">
					<div class="flex">
						<IconButton icon="image" size="2xl" color="indigo-400" />
					</div>
					<button class="bttn ml-auto">Post</button>
				</div>
			</div>
		</div>
	</div>
</form>
