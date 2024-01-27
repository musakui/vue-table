import type {
	//
	Ref,
	VNode,
	Component,
	FunctionalComponent,
} from 'vue'

/** @see https://github.com/vuejs/core/pull/8012 */
export type ClassValue =
	| string
	| Record<string | number, unknown>
	| ClassValue[]

export type RendererComponent<PropType> = FunctionalComponent<{
	/** render function or static string to render */
	render?: string | Component<PropType>

	/** props for render function */
	props?: PropType
}>

export interface ColumnDefinition<const ItemType, const ColKey extends string> {
	/** column key. also used as default object property accessor */
	key: ColKey

	/** classes for `th` element of this column */
	hClass?: ClassValue

	/** classes for `td` elements of this column */
	dClass?: ClassValue

	/** can be used in sorting */
	sortable?: boolean

	/** comparison function used for sorting */
	compare?: (a: ItemType, b: ItemType) => number

	/** column header (defaults to showing `key`) */
	header?: string | ((ctx: ColContext<ItemType, ColKey>) => VNode)

	/** render function for the cells */
	render?: (ctx: CellContext<ItemType, ColKey>) => VNode
}

export interface ColContext<const ItemType, const ColKey extends string> {
	/** current column definition */
	col: readonly ColumnDefinition<ItemType, ColKey>
}

export interface CellContext<const ItemType, const ColKey extends string>
	extends ColContext<ItemType, ColKey> {
	/** current item */
	row: readonly ItemType
}

export interface TableOpts<const ItemType, const ColKey extends string> {
	/** array of column definitions */
	columns: readonly Array<ColKey | ColumnDefinition<ItemType, ColKey>>

	/** get the ID of a row (default: `.id`) */
	id?: (r: ItemType) => string | number

	/** item for type inference */
	item?: readonly ItemType
}

export interface TableDefinition<const ItemType, const ColKey extends string> {
	/** array of column definitions */
	columns: readonly ColumnDefinition<ItemType, ColKey>[]

	/** get the ID of a row */
	id: (r: ItemType) => string | number
}

export interface TableProps<const ItemType, const ColKey extends string> {
	/** table definition */
	table: readonly TableDefinition<ItemType, ColKey>

	/** rows to display */
	rows: readonly ItemType[]

	/** classes to use on `table` */
	class?: ClassValue

	/** classes to use on `thead` */
	headClass?: ClassValue

	/** classes to use on `thead.tr` (default: `rClass`) */
	headRowClass?: ClassValue

	/** classes to use on `tbody` */
	bodyClass?: ClassValue

	/** default classes to use on `th` elements */
	hClass?: ClassValue

	/** default classes to use on `tr` elements */
	rClass?: ClassValue

	/** default classes to use on `td` elements */
	dClass?: ClassValue
}

/** temp workaround for type inference issues */
interface MaybeCellContext<const ItemType, const ColKey extends string> {
	/** current column definition */
	col: readonly ColumnDefinition<ItemType, ColKey>

	/** current item */
	row?: readonly ItemType
}

export type TableViewComponent<
	const ItemType,
	const ColKey extends string
> = FunctionalComponent<
	TableProps<ItemType, ColKey>,
	{},
	Partial<Record<string, (ctx: MaybeCellContext<ItemType, ColKey>) => VNode[]>>
	/*
	{
		[K in ColKey as `th:${K}`]?: (ctx: ColContext<ItemType, K>) => unknown
	} & {
		[K in ColKey as `td:${K}`]?: (ctx: CellContext<ItemType, K>) => unknown
	}
	*/
>
