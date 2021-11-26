<script lang="ts">
	import dayjs from "dayjs";

	import { Link } from "svelte-navigator";
	import DefaultLayout from "../components/layout/DefaultLayout.svelte";
	import Avatar from "../components/ui/Avatar.svelte";
	import IconButton from "../components/ui/buttons/IconButton.svelte";
	import { user } from "../stores/user";
	import type { User } from "../types";
	import { api } from "../utils/settings";
	import { getImageUrl } from "../utils/util";

	async function handleSubmit(event: Event) {
		const target = event.target as HTMLFormElement;
		const formData = new FormData(target);
		const data = Object.fromEntries(formData);

		try {
			const response = await api.put("me", data);
			user.set(response.data as User);
			target.reset();
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
			<Avatar image={getImageUrl($user.avatar.id)} size={84} />
			<button class="bttn">Change avatar</button>
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
