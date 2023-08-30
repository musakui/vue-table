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

export interface TableProps<T> {
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
}

interface ColSlot<T> {
	/** current column definition */
	col: ColumnDefinition<T>

	/** definition for all columns */
	columns: ColumnDefinition<T>[]
}

interface CellSlot<T> extends ColSlot<T> {
	/** current item */
	row: T
}

export type SlotProps<T, ColKey extends string = string> = {
	[K in ColKey as `th:${K}`]?: (_: ColSlot<T>) => unknown
} & {
	[K in ColKey as `td:${K}`]?: (_: CellSlot<T>) => unknown
}
