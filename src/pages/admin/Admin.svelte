<script lang="ts">
	import { Link, Route, Router } from "svelte-navigator";

	import AdminDashboard from "./AdminDashboard.svelte";
	import DefaultLayout from "../../components/layout/DefaultLayout.svelte";
	import IconButton from "../../components/ui/buttons/IconButton.svelte";
	import AdminUser from "./users/AdminUser.svelte";
	import AdminUsers from "./users/AdminUsers.svelte";
</script>

<DefaultLayout>
	<Router primary={false}>
		<div class="header-label text-">
			<Link to="/" class="flex place-items-center"><IconButton icon="arrow_back" color="indigo-500" /></Link>
			<h1>Admin panel</h1>
		</div>
		<nav class="flex gap-8 mb-8 border-b pb-4 border-black border-opacity-20">
			<Link to="" class="nav-admin-link">
				<span class="material-icons-outlined ">dashboard</span>
				<span class="">Dashboard</span>
			</Link>
			<Link to="users" class="nav-admin-link">
				<span class="material-icons-outlined ">person</span>
				<span class="">Users</span>
			</Link>
		</nav>

		<Route path="/">
			<AdminDashboard />
		</Route>
		<Route path="/users">
			<AdminUsers />
		</Route>
		<Route path="/users/*username">
			<AdminUser />
		</Route>
	</Router>
</DefaultLayout>
