<script setup lang="ts">
import { TableView } from '../lib/ui/TableView.js'
import { useTable } from '../lib/index.js'
import { tasks } from './tasks.js'

const data = tasks.map((t) => ({
	id: t.id,
	title: t.title,
	label: t.label,
	status: t.status,
	priority: t.priority,
}))

const table = useTable({
	item: data[0],
	columns: [
		'id',
		'title',
		{
			key: 'status',
			render: ({ row }) => row.status.toUpperCase(),
		},
	]
})
</script>

<template>
	<div class="p-4">
		<div class="rounded-md border">
			<div class="relative w-full overflow-auto">
				<TableView :table="table" :rows="data"
					hClass="h-6 p-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
					class="w-full caption-bottom text-sm" headClass="[&_tr]:border-b" bodyClass="[&_tr:last-child]:border-0"
					rClass="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
					dClass="p-2 align-middle [&:has([role=checkbox])]:pr-0">
					<template #td:title="{ row }">
						{{ row.title.toUpperCase() }}
					</template>
				</TableView>
			</div>
		</div>
	</div>
</template>