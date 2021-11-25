import Home from "./pages/Feed.svelte"

export const routes = [
	/**
	 *
	 * Global Routes
	 *
	 */
	{
		path: "/",
		exact: true,
		component: Home
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