export type ClassBinding = string | string[] | Record<string, unknown>

export type RowFunction<T, U = unknown> = (r: T, c: ColumnDefinition<T>[]) => U

export interface ColumnDefinition<T> {
	/** column key. also used as default object property accessor */
	key: string

	/** text to show in column header (defaults to `key`) */
	header?: string

	/** classes for `th` element of this column */
	hClass?: ClassBinding

	/** classes for `td` elements of this column */
	dClass?: ClassBinding

	/** text to display in the cell */
	display?: RowFunction<T>

	/** text to display on hover */
	hover?: RowFunction<T>
}

interface ColSlot<T> {
	/** current column definition */
	col: ColumnDefinition<T>

	/** definition for all columns */
	columns: ColumnDefinition<T>[]
}

export type SlotFunction<T, U = {}> = (_: ColSlot<T> & U) => unknown
