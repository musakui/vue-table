<script setup>
import { ref } from 'vue'

import { defineColumns, usePagination, useSelection } from '../lib/index.js'
import { TableHeaders } from '../lib/ui/TableHeaders.js'
import { TableCells } from '../lib/ui/TableCells.js'
import { tasks } from './tasks.js'

const data = ref(tasks.slice(0, 25))

const columns = ref(defineColumns([
	{
		key: 'id',
		meta: {
			tdClass: 'max-w-12 p-2',
		},
	},
	{
		key: 'title',
		meta: {
			tdClass: 'max-w-50 p-2 font-sans truncate',
		},
	},
	{
		key: 'status',
		/** @param {{ row: typeof tasks[0] }} */
		cell: ({ row }) => row.status.toUpperCase(),
	},
]))

const { pageItems, pageIndex, pageSize, pageCount, isLastPage, ...pgn } = usePagination({ items: data })
const { rowSelection, pageSelection, isSome, isAll, ...sel } = useSelection({ items: pageItems, id: '' })
</script>

<template>
	<div class="p-4 space-y-2">
		<div class="flex items-center justify-between px-2">
			<div class="flex-1 text-sm text-gray-400">
				{{ pageSelection.length }} of {{ data.length }} selected ({{ rowSelection.length }} total)
			</div>
			<div class="flex items-center space-x-6 lg:space-x-8">
				<div class="flex items-center gap-2">
					<p class="text-xs">per page</p>
					<select v-model="pageSize" class="w-15 px-1 py-0.5 rounded-md text-xs bg-gray-800">
						<option v-for="v in [10, 20, 50]" :value="v">{{ v }}</option>
					</select>
				</div>
				<div class="flex w-10 items-center justify-center text-xs">
					{{ pageIndex + 1 }} / {{ pageCount }}
				</div>
				<div class="flex items-center space-x-2 text-sm">
					<button class="disabled:opacity-70" :disabled="!pageIndex" @click="pgn.goto(0)">⏮️</button>
					<button class="disabled:opacity-70" :disabled="!pageIndex" @click="pgn.prev">◀️</button>
					<button class="disabled:opacity-70" :disabled="isLastPage" @click="pgn.next">️▶️</button>
					<button class="disabled:opacity-70" :disabled="isLastPage" @click="pgn.goto(-1)">️⏭</button>
				</div>
			</div>
		</div>
		<div class="rounded-md border">
			<div class="relative w-full overflow-auto">
				<table class="w-full caption-bottom text-sm">
					<thead class="[&_tr]:border-b">
						<tr>
							<TableHeaders :cols="columns" class="h-6 p-2 text-left align-middle font-medium text-gray-400">
								<template #id>

								</template>
							</TableHeaders>
						</tr>
					</thead>
					<tbody class="[&_tr:last-child]:border-0">
						<tr v-if="!pageItems.length" class="border-b">
							<td :colspan="columns.length" class="h-24 text-center">no items</td>
						</tr>
						<template v-else>
							<tr v-for="row of pageItems" class="border-b hover:bg-gray-800/50 [&:has(:checked)]:bg-gray-700/50">
								<TableCells :row="row" :cols="columns" class="p-2 align-middle">
									<template #id>
										<label @click.shift="sel.shiftSelect(row.id)">
											<input type="checkbox" v-model="pageSelection" :value="row.id" />
											{{ row.id }}
										</label>
									</template>
									<template #title>
										<span :title="row.title">
											{{ row.title }}
										</span>
									</template>
								</TableCells>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>