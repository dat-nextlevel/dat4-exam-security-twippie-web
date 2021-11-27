<script lang="ts">
	import { onMount } from "svelte";

	import { Link } from "svelte-navigator";
	import DefaultLayout from "../components/layout/DefaultLayout.svelte";
	import Avatar from "../components/ui/Avatar.svelte";
	import IconButton from "../components/ui/buttons/IconButton.svelte";
	import { user } from "../stores/user";
	import type { User } from "../types";
	import { api } from "../utils/settings";
	import { getImageUrl } from "../utils/util";

	let newImageInput;
	let imageData = getImageUrl($user.avatar?.id);
	let changingImage = false;

	async function handleSubmit(event: Event) {
		const target = event.target as HTMLFormElement;
		const formData = new FormData(target);
		const data = Object.fromEntries(formData);

		try {
			const response = await api.put("users/me", data);
			user.set(response.data as User);
			target.reset();
		} catch (error) {}
	}

	function handleImageSrc(): string {
		changingImage = true;
		if (newImageInput?.files[0]) {
			const reader = new FileReader();
			reader.onload = () => {
				imageData = reader.result as string;
			};
			reader.readAsDataURL(newImageInput?.files[0]);
			return;
		}
		imageData = getImageUrl($user.avatar.id);
	}

	function cancelImageChange() {
		imageData = getImageUrl($user.avatar.id);
		changingImage = false;
	}

	async function handleImageSubmit(event: Event) {
		const target = event.target as HTMLFormElement;
		const formData = new FormData(target);

		try {
			const response = await api.post("images/avatar", formData);
			user.set(response.data as User);
			target.reset();

			changingImage = false;
		} catch (error) {}
	}
</script>

<DefaultLayout>
	<div class="header-label">
		<Link to="/" class="flex place-items-center"><IconButton icon="arrow_back" color="indigo-500" /></Link>
		<h1>Settings</h1>
	</div>
	<div class="flex place-items-center gap-4 mb-8">
		<div class="flex items-center flex-col gap-2">
			<Avatar image={imageData} size={84} username={$user.username} />
			<form on:submit|preventDefault={handleImageSubmit}>
				<input hidden type="file" bind:this={newImageInput} on:change={handleImageSrc} name="image" />
				{#if changingImage}
					<div class="flex gap-2">
						<button type="button" class="bttn bg-red-500 text-red-700 bg-opacity-10 hover:text-red-800 hover:bg-opacity-20" on:click={cancelImageChange}>Cancel</button>
						<button type="submit" class="bttn bg-green-500 text-green-700 bg-opacity-10 hover:text-green-800 hover:bg-opacity-20">Save</button>
					</div>
				{:else}
					<button type="button" class="bttn" on:click={() => newImageInput.click()}>Change avatar</button>
				{/if}
			</form>
		</div>
		<div class="flex flex-col">
			<span class="text-2xl font-bold">
				{$user.username}
			</span>
			<span>{$user.email}</span>
		</div>
	</div>
	<section>
		<div class="mb-4">
			<h2>Account information</h2>
			<p>Update your email.</p>
		</div>
		<form on:submit|preventDefault={handleSubmit}>
			<div class="form-grp">
				<label>
					Current password
					<input name="passwordCurrent" type="password" required />
				</label>
			</div>
			<div class="form-grp">
				<label>
					New email
					<input name="email" type="email" required />
				</label>
			</div>
			<div class="flex">
				<button class="ml-auto bttn">Change email</button>
			</div>
		</form>
	</section>
	<section>
		<div class="mb-4">
			<h2>Password and Authentication</h2>
			<p>Update your password.</p>
		</div>
		<form on:submit|preventDefault={handleSubmit}>
			<div class="form-grp">
				<label>
					Current password
					<input name="passwordCurrent" type="password" required />
				</label>
			</div>
			<div class="form-grp">
				<label>
					New password
					<input name="password" type="password" required />
				</label>
				<label>
					Confirm
					<input name="passwordRepeat" type="password" required />
				</label>
			</div>
			<div class="flex">
				<button class="ml-auto bttn">Change password</button>
			</div>
		</form>
	</section>
</DefaultLayout>
