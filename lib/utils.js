/**
 * helper utility for column definitions. accepts a string which will be used as the `key`
 *
 * @template T
 * @param {Array<string | import('./types').ColumnDefinition<T>>} defs
 */
export const defineColumns = (defs) => defs.map((d) => {
	return typeof d === 'string' ? { key: d } : d
})
