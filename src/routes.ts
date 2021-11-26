import Feed from "./pages/Feed.svelte"
import Settings from "./pages/Settings.svelte"

export const routes = [
	/**
	 *
	 * Global Routes
	 *
	 */
	{
		path: "/",
		exact: true,
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
]