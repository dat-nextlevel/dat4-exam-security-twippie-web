<style global lang="postcss">
	@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap");
	@import url("https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined");

	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	@layer components {
		h1 {
			@apply text-4xl font-bold mb-12;
		}

		.avatar {
			@apply rounded-full bg-center bg-cover bg-no-repeat bg-coolGray-300;
		}
	}
</style>
