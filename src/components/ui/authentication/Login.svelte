<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import { login } from "../../../authentication/authentication";
	import { user } from "../../../stores/user";
	import type { FormDataLogin } from "../../../types";
	import { failure } from "../toast";

	const dispatch = createEventDispatcher();

	let data: FormDataLogin;

	async function handleRegister(event: Event) {
		const target: HTMLFormElement = event.target as HTMLFormElement;
		const formData = new FormData(target);
		data = Object.fromEntries(formData) as FormDataLogin;

		try {
			user.set(await login(data));
		} catch (error) {
			if (error.response.status == 401) {
				failure("Incorrect username and password combination.");
				return;
			}
			failure(error.response.data?.error || "Unknown error occured while performing this action.");
		}
	}
</script>

<form on:submit|preventDefault={handleRegister}>
	<h2 class="mb-6">Continue posting.</h2>
	<div class="form-grp">
		<label>
			Username
			<input type="text" name="username" required />
		</label>
	</div>
	<div class="form-grp">
		<label>
			Password
			<input type="password" name="password" required />
		</label>
	</div>

	<div class="flex">
		<button type="button" on:click={() => dispatch("use")} class="text-indigo-500 font-bold">Sign up instead.</button>
		<button type="submit" class="bttn ml-auto">Sign in</button>
	</div>
</form>
