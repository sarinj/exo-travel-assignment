"use client"

import { useMemo, useRef } from "react"
import type { SortingState } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
      <header className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-(--brand-secondary)">
            EXO CRM
          </p>
          <h1 className="mt-1 text-3xl font-bold">Customer List</h1>
          <p className="mt-1 text-sm text-slate-600">
            Search and sort across mock customer records.
          </p>
        </div>
        <Button type="button">Add New Customer</Button>
      </header>

      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <div className="mb-5 grid gap-3 md:grid-cols-[1fr]">
            <div className="relative">
              <Search className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
              <Input
                ref={inputRef}
                className="pl-9"
                placeholder="Search by name, company, salesperson"
                onChange={(event) => {
                  debouncedSearch(event.target.value)
                }}
              />
            </div>
          </div>

          <CustomerTable
            data={customersQuery.data?.data ?? []}
            isLoading={customersQuery.isLoading}
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
      </Card>
    </main>
  )
}
