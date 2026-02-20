import { h, defineComponent, normalizeClass as nClass } from 'vue'
import { defaultRender } from '../utils.js'

/** @import { PropType, SlotsType } from 'vue' */
/** @import { ColumnDefinition, CellSlots } from '../types' */

/**
 * @template ItemType
 * @template ColKey
 */
export const TableCells = defineComponent({
	props: {
		row: {
			type: /** @type {PropType<ItemType>} */ (Object),
			required: true,
		},
		cols: {
			type: /** @type {PropType<ColumnDefinition<ItemType, ColKey>[]>} */ (
				Array
			),
			required: true,
		},
		class: String,
	},
	slots: /** @type {SlotsType<CellSlots<ItemType, ColKey>>} */ (Object),
	setup: (props, { slots }) => {
		return () => {
			return props.cols.map((col) => {
				const { key, meta, cell } = col
				const pp = { key, class: nClass(meta?.tdClass ?? props.class) }
				const rd = cell ?? slots[key] ?? defaultRender(key)
				return h('td', pp, rd({ row: props.row, col }))
			})
		}
	},
})
