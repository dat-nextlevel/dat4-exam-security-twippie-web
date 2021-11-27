import Feed from "./pages/Feed.svelte"
import Settings from "./pages/Settings.svelte"
import Admin from "./pages/admin/Admin.svelte"

export const routes = [
	/**
	 *
	 * Global Routes
	 *
	 */
	{
		path: "/",
		component: Feed
	},
	{
		path: "/profile/*profile",
		component: Feed
	},
	{
		path: "/sign-in",
	},

	/**
	 * 
	 * Protected
	 * 
	 */

	{
		path: "/settings",
		protected: true,
		component: Settings

	},

	/**
	 * 
	 * Admin
	 * 
	 */

	{
		path: "/admin/*adminRoute",
		protected: true,
		admin: true,
		component: Admin
	},
]