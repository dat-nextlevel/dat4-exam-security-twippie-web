<script lang="ts">
	import { getColorCssClassFromUsername } from "../../utils/util";

	export let image: string;
	export let size: number = 50;
	export let username: string = "no-name";
	export let className: string = "";
</script>

<div class="avatar {className} bg-{!image ? getColorCssClassFromUsername(username) : ''}" style="{image ? `background-image: url(${image});` : ''} width:{size}px; height:{size}px" />
