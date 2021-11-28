<script lang="ts">
	import { Link } from "svelte-navigator";
	import { handleSignOut } from "../../../authentication/authentication";
	import { user } from "../../../stores/user";
	import Register from "../authentication/Register.svelte";
	import Login from "../authentication/Login.svelte";
	import Avatar from "../Avatar.svelte";
	import { getImageUrl } from "../../../utils/util";
	import Username from "../Username.svelte";

	let form = "register";
</script>

<div class="flex-1 px-12">
	<div class="sticky top-0 ml-auto" style="max-width:320px">
		<div class="header-label">
			<Link to="/"><span class="font-bold text-xl">twippie.</span></Link>
		</div>
		<div>
			{#if !$user}
				{#if form == "register"}
					<Register on:use={() => (form = "login")} />
				{:else}
					<Login on:use={() => (form = "register")} />
				{/if}
			{:else}
				<nav class="flex gap-4 flex-col">
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
					<div class="flex place-items-center">
						<Link to="/profile/{$user.username}" class="nav-link">
							<Avatar image={getImageUrl($user.avatar?.id)} username={$user.username} size={30} />
							<Username>{$user.username}</Username>
						</Link>
						{#if $user.muted}
							<div class="text-xs font-bold uppercase ml-2 bg-opacity-30 bg-yellow-400 p-1 px-2 rounded-full">MUTED BY ADMIN</div>
						{/if}
					</div>
					{#if $user?.roles.find((r) => r == "ADMIN") != null}
						<div class="border-t border-b py-2">
							<Link to="/admin" class="nav-link hover:bg-opacity-10 text-blue-700 hover:bg-blue-500 hover:text-blue-700">
								<span class="material-icons-outlined ">admin_panel_settings</span>
								<span class="">Admin</span>
							</Link>
						</div>
					{/if}
					<div>
						<button on:click={handleSignOut} type="button" class="nav-link hover:bg-opacity-10 text-red-500  hover:bg-red-500 hover:text-red-500">
							<span class="material-icons-outlined ">logout</span>
							<span class="">Sign out</span>
						</button>
					</div>
				</nav>
			{/if}
		</div>
	</div>
</div>
