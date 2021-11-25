import Feed from "./pages/Feed.svelte"

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
		protected: true
	},
]