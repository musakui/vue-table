<script setup lang="ts" generic="T extends { id?: string | number }">
import { computed } from 'vue'

import type { ColumnDefinition, RowFunction, ClassBinding, SlotFunction } from './types'

const props = defineProps<{
	/** rows to display */
	rows: T[]

	/** array of column definitions */
	columns: ColumnDefinition<T>[]

	/** function to get the ID of a row */
	id?: RowFunction<T, string | number>

	/** classes to use on `thead` */
	headClass?: ClassBinding

	/** classes to use on `tbody` */
	bodyClass?: ClassBinding

	/** default classes to use on `th` elements */
	hClass?: ClassBinding

	/** default classes to use on `tr` elements */
	rClass?: ClassBinding

	/** default classes to use on `td` elements */
	dClass?: ClassBinding
}>()

const getDisplay = (prop: string) => {
	if (prop.indexOf('.') < 0) {
		return (r: T) => r[prop as keyof T]
	}

	const path = prop.split('.')
	return (r: T) => path.reduce((obj, key) => {
		return (obj as Record<string, unknown>)?.[key]
	}, r as unknown)
}

const showCols = computed(() => {
	if (!props.columns) return []
	return props.columns.flatMap((c) => {
		const { key, ...o } = typeof c === 'string' ? { key: c } : c
		if (!key) return []
		return [
			{
				key,
				header: key,
				hClass: props.hClass,
				dClass: props.dClass,
				...o,
				display: o.display ?? getDisplay(key),
			},
		]
	})
})

type ColKey = (typeof props)['columns'][number]['key']
type RowSlot = {
	/** current item */
	row: T
}

defineSlots<{
	[K in ColKey as `th:${K}`]?: SlotFunction<T>
} & {
	[K in ColKey as `td:${K}`]?: SlotFunction<T, RowSlot>
}>()
</script>

<template>
	<table>
		<thead :class="headClass">
			<tr>
				<th v-for="col of showCols" :key="col.key" :class="col.hClass">
					<slot :name="`th:${col.key}`" :col="col" :columns="showCols">
						{{ col.header || col.key }}
					</slot>
				</th>
			</tr>
		</thead>
		<tbody :class="bodyClass">
			<tr v-for="row of rows" :key="props.id?.(row, showCols) ?? row.id" :class="rClass">
				<td v-for="col of showCols" :key="col.key" :class="col.dClass">
					<slot :name="`td:${col.key}`" :row="row" :col="col" :columns="showCols">
						<span :title="`${col.hover?.(row, showCols) || ''}`">
							{{ col.display?.(row, showCols) }}
						</span>
					</slot>
				</td>
			</tr>
		</tbody>
	</table>
</template>
