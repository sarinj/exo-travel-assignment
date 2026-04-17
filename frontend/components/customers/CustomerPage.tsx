"use client"

import { useMemo, useRef } from "react"
import type { SortingState } from "@tanstack/react-table"
import { Search, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, CardHeader } from "@/components/ui/card"
import { useCustomersQuery } from "@/hooks/use-customers"
import { useURLSearchParams } from "@/hooks/useURLSearchParams"
import { useDebounceCallback } from "@/hooks/useDebounceCallback"

import type { ListCustomersParams } from "@/api/customer"
import CustomerTable from "./components/CustomerTable"
import CustomerPagination from "./components/CustomerPagination"

export default function CustomerPage() {
  const { params, updateParams } = useURLSearchParams<ListCustomersParams>({
    defaultParams: {
      search: "",
      page: 1,
      limit: 20,
    },
  })

  const inputRef = useRef<HTMLInputElement>(null)

  const search = params.search ?? ""
  const page = params.page ?? 1
  const pageSize = params.limit ?? 20
  const sortBy = params.sortBy
  const order = params.order

  const debouncedSearch = useDebounceCallback((searchValue: string) => {
    updateParams({ search: searchValue, page: 1 })
  }, 300)

  const sorting: SortingState = sortBy
    ? [{ id: sortBy, desc: order === "desc" }]
    : []

  const queryParams = useMemo(() => {
    const params: ListCustomersParams = {
      search,
      limit: pageSize,
      page,
    }

    if (sortBy) params.sortBy = sortBy
    if (order) params.order = order
    return params
  }, [search, sortBy, order, page, pageSize])

  const customersQuery = useCustomersQuery(queryParams)
  const meta = customersQuery.data?.meta

  return (
    <main className="app-shell">
      <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mt-2">
        <div>
          <h1 className="text-3xl font-bold text-(--brand-primary) sm:text-4xl lg:text-5xl">
            Customers
          </h1>
        </div>
        <Button type="button" className="w-full px-6 sm:w-auto">
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Customer
        </Button>
      </header>

      <div className="">
        <CardHeader className="pb-0"></CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-3 rounded-lg bg-primary-50 p-3 sm:p-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
              <Input
                ref={inputRef}
                className="h-10 rounded-lg border-(--brand-border) bg-white pl-9"
                placeholder="Search name, company, or salesperson..."
                onChange={(event) => {
                  debouncedSearch(event.target.value)
                }}
              />
            </div>
          </div>

          <CustomerTable
            data={customersQuery.data?.data ?? []}
            isLoading={customersQuery.isLoading}
            pageSize={pageSize}
            sorting={sorting}
            onSortingChange={(nextSorting) => {
              const nextSort = nextSorting[0]
              if (nextSort) {
                updateParams({
                  sortBy: nextSort.id as ListCustomersParams["sortBy"],
                  order: nextSort.desc ? "desc" : "asc",
                  page: 1,
                })
              } else {
                // Clear sort by removing sortBy and order from params
                updateParams({
                  sortBy: undefined,
                  order: undefined,
                  page: 1,
                })
              }
            }}
          />

          <CustomerPagination
            page={meta?.page ?? page}
            pageSize={meta?.limit ?? pageSize}
            total={meta?.total ?? 0}
            totalPages={meta?.totalPages ?? 1}
            isLoading={customersQuery.isLoading}
            onPageChange={(nextPage) => {
              const safePage = Math.max(1, nextPage)
              const maxPage = Math.max(meta?.totalPages ?? 1, 1)
              updateParams({ page: Math.min(safePage, maxPage) })
            }}
            onPageSizeChange={(nextPageSize) => {
              updateParams({ limit: nextPageSize, page: 1 })
            }}
          />
        </CardContent>
      </div>
    </main>
  )
}
