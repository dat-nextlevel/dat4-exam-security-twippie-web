<script lang="ts">
	import { Link } from "svelte-navigator";
	import { handleSignOut } from "../../../authentication/authentication";
	import { user } from "../../../stores/user";
	import Register from "../authentication/Register.svelte";
	import Login from "../authentication/Login.svelte";
	import IconButton from "../buttons/IconButton.svelte";
	import Avatar from "../Avatar.svelte";
	import { getImageUrl } from "../../../utils/util";
	import Username from "../Username.svelte";

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
				<div class="flex gap-4 flex-col">
					<div>
						<Link to="/" class="nav-link">
							<Avatar image={getImageUrl($user.avatar?.id)} size={30} />
							<Username>{$user.username}</Username>
						</Link>
					</div>
					<div>
						<Link to="/" class="nav-link">
							<span class="material-icons-outlined ">chat_bubble_outline</span>
							<span class="">Feed</span>
						</Link>
					</div>
					<div>
						<Link to="/settings" class="nav-link">
							<span class="material-icons-outlined ">settings</span>
							<span class="">Settings</span>
						</Link>
					</div>
					<div>
						<button on:click={handleSignOut} type="button" class="nav-link hover:bg-opacity-10 text-red-500  hover:bg-red-500 hover:text-red-500">
							<span class="material-icons-outlined ">logout</span>
							<span class="">Sign out</span>
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
