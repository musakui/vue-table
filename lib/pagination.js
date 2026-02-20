import { ref, unref, computed, watch } from 'vue'

/**
 * @template ItemType
 * @param {import('./types').PaginationOptions<ItemType>} opts
 */
export function usePagination(opts) {
	const pageIdx = ref(opts.initialPageIndex || 0)
	const pageSize = ref(opts.initialPageSize || 10)

	const pageCount = computed(() => {
		return Math.ceil((unref(opts.items)?.length || 0) / pageSize.value)
	})

	const pageIndex = computed({
		get() {
			return pageIdx.value
		},
		set(v) {
			const count = pageCount.value
			pageIdx.value = (count + v) % count
		},
	})

	const pageItems = computed(() => {
		const take = pageSize.value
		const skip = pageIdx.value * take
		return unref(opts.items).slice(skip, skip + take)
	})

	const isLastPage = computed(() => pageIdx.value + 1 === pageCount.value)

	watch(pageCount, (v) => {
		const last = v - 1
		if (pageIdx.value > last) {
			pageIdx.value = last
		}
	})

	return {
		pageSize,
		pageIndex,
		pageCount,
		pageItems,
		isLastPage,
		/**
		 * go to page number
		 * @param {number} n page number
		 */
		goto(n) {
			pageIndex.value = n
		},
		/** go to next page */
		next() {
			++pageIndex.value
		},
		/** go to previous page */
		prev() {
			--pageIndex.value
		},
	}
}
