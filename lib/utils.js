/**
 * @template ItemType
 * @template {string | number} IdType
 * @param {string | number | ((i: ItemType) => IdType)} [getId]
 */
export const makeGetId = (getId) => {
	if (getId && typeof getId === 'function') return getId

	/**
	 * @param {ItemType} item
	 * @return {IdType}
	 */
	return (item) => item[getId ?? 'id']
}

/**
 * @param {string | number | symbol} prop
 * @param {string} placeholder
 */
export function defaultRender(prop, placeholder = '-') {
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
 * @template ItemType
 * @template {string} ColKey
 * @param {import('./types').ColumnDefinition<ItemType, ColKey>[]} cols
 */
export function defineColumns(cols) {
	return cols
}
