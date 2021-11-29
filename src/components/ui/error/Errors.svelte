<script lang="ts">
	export let fieldErrors;
</script>

<section class="mb-4">
	<div class="flex-col flex gap-2 p-4 bg-red-400 bg-opacity-10 border border-red-300 text-red-800">
		<p class="font-bold">There were errors in these fields.</p>
		<div class="pl-4 flex-col flex gap-2">
			{#each Object.keys(fieldErrors) as key}
				<span><span class="font-bold">{key}:</span> {fieldErrors[key]}</span>
			{/each}
		</div>
	</div>
</section>
