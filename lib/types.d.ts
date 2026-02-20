import type {
	//
	Ref,
	VNode,
	MaybeRef,
} from 'vue'

/** @see https://github.com/vuejs/core/pull/8012 */
export type ClassValue =
	| string
	| Record<string | number, unknown>
	| ClassValue[]

export type Renderable = string | number | VNode | VNode[]

export type PaginationOptions<const ItemType> = {
	items: MaybeRef<ItemType[]>

	/** default page size (default: 10) */
	initialPageSize?: number

	/** default page index (default: 0) */
	initialPageIndex?: number
}

export type SelectionOptions<const ItemType, IdType extends string | number> = {
	items: MaybeRef<ItemType[]>

	id?: IdType

	/** function to get the id of the row, or the key/index for the id */
	getId?: string | number | ((r: ItemType) => IdType)
}

export type ColumnDefinition<const ItemType, const ColKey extends string> = {
	/** column key. also used as default object property accessor */
	key: ColKey

	/** random stuff */
	meta?: ColumnMeta

	/** comparison function used for sorting */
	compare?: (a: ItemType, b: ItemType) => number

	/** cell display */
	cell?: (ctx: CellContext<ItemType, ColKey>) => Renderable

	/** header display */
	header?: string | ((ctx: ColContext<ItemType, ColKey>) => Renderable)
}

export interface ColumnMeta {
	/** class to use for column header */
	thClass?: ClassValue

	/** class to use for column cells */
	tdClass?: ClassValue
}

export interface ColContext<ItemType, const ColKey extends string> {
	/** current column definition */
	col: readonly ColumnDefinition<ItemType, ColKey>
}

export interface CellContext<const ItemType, const ColKey extends string>
	extends ColContext<ItemType, ColKey> {
	/** current item */
	row: readonly ItemType
}

export type HeaderSlots<ItemType, const ColKey extends string> = Record<
	ColKey,
	(ctx: ColContext<ItemType, ColKey>) => VNode[]
>

export type CellSlots<const ItemType, const ColKey extends string> = Record<
	ColKey,
	(ctx: CellContext<ItemType, ColKey>) => VNode[]
>
