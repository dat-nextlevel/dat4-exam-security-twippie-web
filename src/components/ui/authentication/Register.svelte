<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import { register } from "../../../authentication/authentication";
	import { user } from "../../../stores/user";
	import type { FormDataRegister } from "../../../types";
	import Errors from "../error/Errors.svelte";
	import { failure, success } from "../toast";

	const dispatch = createEventDispatcher();

	let fieldErrors = null;

	let data: FormDataRegister;

	async function handleRegister(event: Event) {
		const target: HTMLFormElement = event.target as HTMLFormElement;
		const formData = new FormData(target);
		data = Object.fromEntries(formData) as FormDataRegister;
		try {
			user.set(await register(data));
			fieldErrors = null;
			success("Welcome to twippie!");
		} catch (error) {
			failure(error.response.data?.error || "Unknown error occured while performing this action.");
			fieldErrors = error.response.data?.fieldErrors;
		}
	}
</script>

<form on:submit|preventDefault={handleRegister}>
	<h2 class="mb-6">Start posting today.</h2>
	{#if fieldErrors}
		<Errors {fieldErrors} />
	{/if}

	<div class="form-grp">
		<label>
			Username
			<input type="text" name="username" required />
		</label>
	</div>
	<div class="form-grp">
		<label>
			Email
			<input type="email" name="email" required />
		</label>
	</div>
	<div class="form-grp">
		<label>
			Password
			<input type="password" name="password" required />
		</label>
		<label>
			Confirm
			<input type="password" name="passwordRepeat" required />
		</label>
	</div>

	<div class="flex">
		<button type="button" on:click={() => dispatch("use")} class="text-indigo-500 font-bold">Sign in instead.</button>
		<button type="submit" class="bttn ml-auto">Sign up</button>
	</div>
</form>
