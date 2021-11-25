<script>
	import { Link } from "svelte-navigator";
	import { user } from "../../../stores/user";
</script>

<div class="ml-auto px-12" style="width:360px">
	<div class="sticky top-0">
		<div class="header-label">
			<Link to="/aa"><span class="font-bold text-xl">twippie.</span></Link>
		</div>
		<div>
			{#if user}
				<form>
					<h2 class="mb-6">Start posting today.</h2>
					<div class="form-grp">
						<label>
							Username
							<input type="text" />
						</label>
					</div>
					<div class="form-grp">
						<label>
							Password
							<input type="password" />
						</label>
						<label>
							Confirm
							<input type="password" class="w-full border border-blueGray-300 rounded" />
						</label>
					</div>

					<div class="flex">
						<button class="text-indigo-500 font-bold">Sign in instead.</button>
						<button class="bttn ml-auto">Sign up</button>
					</div>
				</form>
			{:else}
				<p>Welcome</p>
			{/if}
		</div>
	</div>
</div>
