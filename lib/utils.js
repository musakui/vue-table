/**
 * @param {unknown} c
 * @return {c is string | number | symbol}
 */
const isKeyType = (c) => {
	const tp = typeof c
	return tp === 'string' || tp === 'number' || tp === 'symbol'
}

/**
 * @param {string | number | symbol} prop
 * @param {string} placeholder
 */
export const defaultRender = (prop, placeholder = '-') => {
	if (
		typeof prop === 'number' ||
		typeof prop === 'symbol' ||
		prop.indexOf('.') < 0
	) {
		/** @param {{ row: unknown }} c */
		return (c) => `${c.row[prop] ?? placeholder}`
	}

	const path = prop.split('.')
	/** @param {{ row: unknown }} c */
	return (c) => `${path.reduce((obj, key) => obj?.[key], c.row) ?? placeholder}`
}

/**
 * @template {{ id?: string | number }} const ItemType
 * @template {string | number | keyof ItemType} [const ColKey=string]
 * @param {import('./types').TableOpts<ItemType, ColKey>} opts
 */
export const useTable = (opts) => {
	const columns = opts.columns.map((c) => (isKeyType(c) ? { key: c } : c))

	return {
		columns,
		id: opts.id ?? ((r) => r.id ?? '_'),
	}
}

/**
 * @template const P
 * @param {string | import('vue').Component<P>} c
 * @return {c is import('vue').Component<P>}
 */
export const isComponent = (c) => {
	if (!c) return false
	const tc = typeof c
	return tc === 'function' || tc === 'object'
}
