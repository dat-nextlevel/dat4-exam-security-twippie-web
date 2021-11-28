<script lang="ts">
	import dayjs from "dayjs";

	import { onMount } from "svelte";
	import { Link } from "svelte-navigator";
	import Avatar from "../../components/ui/Avatar.svelte";
	import type { Audit, AuditUi, Stats } from "../../types";

	import { api } from "../../utils/settings";
	import { getAuditUiUtilsFromAuditType, getColorCssClassFromUsername, getImageUrl } from "../../utils/util";

	let stats: Stats = { users: 0, posts: 0 };

	let audits: Array<Audit> = [];

	async function getStats() {
		const response = await api.get(`stats/month/${Date.now().valueOf()}`);
		stats = response.data;
	}

	async function getAudit() {
		const response = await api.get(`audit`);
		audits = response.data;
		audits.map((a) => {
			a.typeUi = getAuditUiUtilsFromAuditType(a.type) as AuditUi;
			return a;
		});

		// THIS SHOULD BE HANDED ON SERVER SIDE
		// BUT TIME CRUNCH FOR THIS PROOF OF CONCEPT IS INEVITABLE
		audits = audits.reverse();
	}

	onMount(async () => {
		getStats();
		getAudit();
	});
</script>

<h2 class="mb-6">Changes this month</h2>
<div class="grid gap-8 grid-cols-2 auto-cols-auto items-stretch text-lg">
	<div class="p-6 bg-gray-100 hover:bg-indigo-100 rounded-xl transition-all transform hover:-translate-y-1 flex-col gap-2 flex">
		<span class="material-icons text-3xl">person</span>
		<p>{stats.users} new users.</p>
	</div>
	<div class="p-6 bg-gray-100 hover:bg-yellow-100 rounded-xl transition-all transform hover:-translate-y-1 flex-col gap-2 flex">
		<span class="material-icons text-3xl">forum</span>
		<p>{stats.posts} new posts.</p>
	</div>
</div>

<section class="my-8">
	<div class="mb-6">
		<h2 class="">Audit Log</h2>
		<p>Events executed by admins.</p>
	</div>
	<div class="flex flex-col gap-4">
		{#each audits as audit}
			<div class="bg-gray-100 p-4 flex gap-4">
				<div class="place-items-center flex gap-4">
					<div class="place-items-center flex relative">
						<span class="material-icons-outlined">{audit.typeUi.icon}</span>
						<span style="height:10px; width:10px;" class="absolute bottom-0 right-0 bg-{audit.typeUi.cssColor} rounded-full border-2 border-gray-100" />
					</div>
					<Avatar image={getImageUrl(audit.issuer.avatar?.id)} size={32} />
				</div>
				<div class="flex-col place-items-center">
					<div class="flex place-items-center gap-2">
						<span class="font-bold"><Link to="/admin/users/{audit.issuer.username}">{audit.issuer.username}</Link></span>
						<span>performed</span>
						<span class="text-xs font-bold uppercase bg-opacity-30 bg-{audit.typeUi.cssColor} p-1 px-2 rounded-full">{audit.type}</span>
						<span>against</span>
						{#if audit.against}<span class="font-bold"><Link to="/admin/users/{audit.against.username}">{audit.against.username}</Link></span>
						{:else}
							<div class="font-bold text-gray-600">
								<span class="flex place-items-center gap-1"> DELETED USER </span>
							</div>
						{/if}
					</div>
					<span class="text-sm">{dayjs(audit.createdAt).format("MMM DD [at] h:mm A")}</span>
				</div>
			</div>
		{/each}
	</div>
</section>
