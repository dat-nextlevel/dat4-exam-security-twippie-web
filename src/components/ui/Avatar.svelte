<script lang="ts">
	import { getColorCssClassFromUsername } from "../../utils/util";

	export let image: string;
	export let size: number = 50;
	export let username: string = "no-name";
</script>

<div class="avatar bg-{!image ? getColorCssClassFromUsername(username) : ''}" style="{image ? `background-image: url(${image});` : ''} width:{size}px; height:{size}px" />
