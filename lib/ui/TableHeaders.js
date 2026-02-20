import { h, defineComponent, normalizeClass as nClass } from 'vue'

/** @import { PropType, SlotsType } from 'vue' */
/** @import { ColumnDefinition, HeaderSlots } from '../types' */

/**
 * @template ItemType
 * @template ColKey
 */
export const TableHeaders = defineComponent({
	props: {
		cols: {
			type: /** @type {PropType<ColumnDefinition<ItemType, ColKey>[]} */ (
				Array
			),
			required: true,
		},
		class: String,
	},
	slots: /** @type {SlotsType<HeaderSlots<ItemType, ColKey>>} */ (Object),
	setup: (props, { slots }) => {
		return () => {
			return props.cols.map((col) => {
				const { key, meta, header: hd } = col
				const pp = { key, class: nClass(meta?.thClass ?? props.class) }
				const rd =
					typeof hd === 'string' ? () => hd : hd ?? slots[key] ?? (() => key)
				return h('th', pp, rd({ col }))
			})
		}
	},
})
