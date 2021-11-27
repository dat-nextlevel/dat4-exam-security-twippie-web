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
			@apply rounded-full bg-center bg-cover bg-no-repeat bg-coolGray-300;
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
	}
</style>
