import { h, normalizeClass } from 'vue'
import { defaultRender } from '../utils.js'

/**
 * @template const ItemType
 * @template {string} const ColKey
 * @type {import('../types').TableViewComponent<ItemType, ColKey>}
 */
export const TableView = (prs, { slots }) => {
	const headers = prs.table.columns.map((col) => {
		const key = col.key
		const props = { key, class: normalizeClass(col.hClass ?? prs.hClass) }
		const hd = col.header
		const render =
			typeof hd === 'string'
				? () => hd
				: (hd ?? slots[`th:${key}`] ?? (() => key))
		return h('th', props, render({ col }))
	})

	const columns = prs.table.columns.map((col) => {
		const key = col.key
		const props = { key, class: normalizeClass(col.dClass ?? prs.dClass) }
		const render = col.render ?? slots[`td:${key}`] ?? defaultRender(key)
		/** @param {ItemType} row */
		return (row) => h('td', props, render({ col, row }))
	})

	const rows = prs.rows.map((row) => {
		const props = { key: prs.table.id(row), class: normalizeClass(prs.rClass) }
		// prettier-ignore
		return h('tr', props, columns.map((r) => r(row)))
	})

	return h('table', { class: normalizeClass(prs.class) }, [
		h('thead', { class: normalizeClass(prs.headClass) }, [
			// prettier-ignore
			h('tr', { class: normalizeClass(prs.headRowClass ?? prs.rClass) }, headers),
		]),
		h('tbody', { class: normalizeClass(prs.bodyClass) }, rows),
	])
}
