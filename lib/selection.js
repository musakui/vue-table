import { ref, unref, computed } from 'vue'
import { makeGetId } from './utils.js'

const SEL_NONE = 0
const SEL_SOME = 1
const SEL_ALL = 2

/**
 * @template ItemType
 * @template {string | number} IdType
 * @param {import('./types').SelectionOptions<ItemType, IdType>} opts
 */
export function useSelection(opts) {
	/** global selected item ids */
	/** @type {import('vue').Ref<IdType[]>} */
	const rowSelection = ref([])

	const getId = makeGetId(opts.getId)
	const pageIds = computed(() => unref(opts.items).map(getId))

	/** selected item ids within items */
	const pageSelection = computed({
		get() {
			const rs = new Set(rowSelection.value)
			return pageIds.value.filter((i) => rs.has(i))
		},
		set(v) {
			const rs = new Set(rowSelection.value)
			const upd = new Set([...rs.difference(new Set(pageIds.value)), ...v])
			rowSelection.value = [...upd]
		},
	})

	/** current state of entire selection */
	const state = computed(() => {
		const len = pageIds.value.length
		const sel = pageSelection.value.length
		return !len || !sel ? SEL_NONE : len === sel ? SEL_ALL : SEL_SOME
	})

	/** toggle entire selection */
	function toggleAll() {
		pageSelection.value = state.value < SEL_ALL ? pageIds.value : []
	}

	/**
	 * select from last selected item to target
	 * @param {IdType} target
	 */
	function shiftSelect(target) {
		if (pageSelection.value.length < 1) return
		const ids = pageIds.value
		const src = pageSelection.value.at(-1)
		const [a, b] = ids.flatMap((i, j) => (i === src || i === target ? [j] : []))
		const toSelect = new Set([...pageSelection.value, ...ids.slice(a, b)])
		toSelect.delete(target)
		pageSelection.value = [...toSelect, target]
		setTimeout(() => document.getSelection().removeAllRanges(), 10)
	}

	return {
		rowSelection,
		pageSelection,
		toggleAll,
		shiftSelect,
		/** are all rows selected? */
		isAll: computed(() => state.value === SEL_ALL),
		/** are some rows selected? (note: `false` if all selected) */
		isSome: computed(() => state.value === SEL_SOME),
		/** are no rows selected? */
		isNone: computed(() => state.value === SEL_NONE),
	}
}
