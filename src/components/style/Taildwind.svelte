<style global lang="postcss">
	@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap");
	@import url("https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined");

	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	@layer components {
		h1 {
			@apply text-4xl font-bold;
		}

		h2 {
			@apply text-2xl font-bold;
		}

		input {
			@apply w-full border border-indigo-200 rounded p-1;
		}

		label {
			@apply font-bold mb-2 w-full;
		}

		.avatar {
			@apply rounded-full bg-center bg-cover bg-no-repeat bg-gray-200;
		}

		.header-label {
			@apply h-12 flex place-items-center mb-8;
		}

		.form-grp {
			@apply flex gap-4 mb-4;
		}

		.bttn {
			@apply bg-indigo-400 transition-colors hover:bg-opacity-20 bg-opacity-10 hover:text-indigo-700 text-indigo-500 rounded px-4 py-2;
		}

		.bttn-danger {
			@apply bttn bg-red-500 bg-opacity-10 text-red-800 hover:bg-red-500 hover:text-red-900 hover:bg-opacity-20;
		}

		.bttn-warning {
			@apply bttn bg-yellow-500 bg-opacity-10 text-yellow-800 hover:bg-yellow-500 hover:text-yellow-900 hover:bg-opacity-20;
		}

		.nav-link {
			@apply inline-flex rounded-full group gap-2 place-items-center hover:bg-indigo-500 text-black hover:text-indigo-700 hover:bg-opacity-10 transition-colors px-4 py-3;
		}

		.dropdown-link {
			@apply nav-link rounded-none p-4 gap-3;
		}

		.nav-admin-link {
			@apply nav-link p-0 hover:bg-opacity-0;
		}

		.dropdown-menu {
			@apply z-20;
		}

		.dropdown-content {
			@apply rounded filter shadow-lg drop-shadow-2xl bg-white gap-4 flex flex-col;
		}

		/**
		
		
		Svelte toast forces my hand...
		
		
		
		**/

		._toastContainer {
			@apply fixed right-14 top-14 z-50 flex flex-col gap-8;
		}

		._toastItem {
			@apply bg-white border relative flex gap-4 border-gray-400 text-black max-w-xs p-4 rounded shadow-xl filter drop-shadow-lg;
		}

		._toastItem.error {
			@apply bg-red-100 border-red-400 text-red-800;
		}

		._toastItem.warning {
			@apply bg-yellow-100 border-yellow-400 text-yellow-800;
		}

		.pe,
		._toastMsg :global(a) {
			pointer-events: auto;
		}
		._toastBtn {
			width: 2rem;
			height: 100%;
			font: 1rem sans-serif;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			outline: none;
		}
		._toastBar {
			top: auto;
			right: auto;
			bottom: 0;
			left: 0;
			height: 2px;
			width: 100%;
			position: absolute;
			display: block;
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			border: none;
			background: transparent;
			pointer-events: none;
		}
		._toastBar::-webkit-progress-bar {
			background: transparent;
		}

		._toastBar::-webkit-progress-value {
			@apply bg-indigo-400;
		}
		._toastBar::-moz-progress-bar {
			@apply bg-indigo-400;
		}

		.error ._toastBar::-webkit-progress-value {
			@apply bg-red-400;
		}
		.error ._toastBar::-moz-progress-bar {
			@apply bg-red-400;
		}

		.warning ._toastBar::-webkit-progress-value {
			@apply bg-yellow-400;
		}
		.warning ._toastBar::-moz-progress-bar {
			@apply bg-yellow-400;
		}
	}
</style>
