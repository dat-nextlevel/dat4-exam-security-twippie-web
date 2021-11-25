<script lang="ts">
	export let image: string;
	export let size: number = 50;
</script>

<div class="avatar" style="background-image: url({image}); width:{size}px; height:{size}px" />
