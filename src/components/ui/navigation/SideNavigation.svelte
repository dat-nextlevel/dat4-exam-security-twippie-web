<script>
	import { Link } from "svelte-navigator";
	import { handleSignOut } from "../../../authentication/authentication";
	import { user } from "../../../stores/user";
	import Register from "../authentication/Register.svelte";
	import Login from "../authentication/Login.svelte";

	let form = "register";
</script>

<div class="flex-1 px-12">
	<div class="sticky top-0 ml-auto" style="max-width:320px">
		<div class="header-label">
			<Link to="/aa"><span class="font-bold text-xl">twippie.</span></Link>
		</div>
		<div>
			{#if !$user}
				{#if form == "register"}
					<Register on:use={() => (form = "login")} />
				{:else}
					<Login on:use={() => (form = "register")} />
				{/if}
			{:else}
				{$user.username}
				<button class="bttn" on:click={handleSignOut}>Sign out</button>
			{/if}
		</div>
	</div>
</div>
