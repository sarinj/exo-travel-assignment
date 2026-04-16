"use client"
"use no memo"

import Link from "next/link"
import {
  functionalUpdate,
  flexRender,
  getCoreRowModel,
  type ColumnDef,
  type SortingState,
  type Updater,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Customer } from "@/api/customer"

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

function SortIndicator({ state }: { state: false | "asc" | "desc" }) {
  if (state === "asc") {
    return <ArrowUp className="h-3.5 w-3.5" />
  }

  if (state === "desc") {
    return <ArrowDown className="h-3.5 w-3.5" />
  }

  return <ArrowUpDown className="h-3.5 w-3.5 opacity-70" />
}

export default function CustomerTable({
  data,
  isLoading,
  sorting,
  onSortingChange,
}: {
  data: Customer[]
  isLoading: boolean
  sorting: SortingState
  onSortingChange: (sorting: SortingState) => void
}) {
  const columns = useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "Customer",
        cell: ({ row }) => (
          <div>
            <p className="font-semibold">{row.original.name}</p>
            <p className="text-xs text-slate-500">{row.original.email}</p>
          </div>
        ),
      },
      {
        accessorKey: "company",
        header: "Company",
        enableSorting: false,
      },
      {
        accessorKey: "salesperson",
        header: "Salesperson",
        enableSorting: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            className={
              row.original.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: "total_spend",
        header: "Spend",
        cell: ({ row }) => currency(row.original.total_spend),
      },
      {
        accessorKey: "number_of_purchases",
        header: "Purchases",
      },
      {
        id: "action",
        enableSorting: false,
        header: "Action",
        cell: ({ row }) => (
          <div className="text-right">
            <Button asChild variant="outline" size="sm">
              <Link href={`/customers/${row.original.id}`}>View Profile</Link>
            </Button>
          </div>
        ),
      },
    ],
    [],
  )

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: (updater: Updater<SortingState>) => {
      const nextSorting = functionalUpdate(updater, sorting).slice(0, 1)
      onSortingChange(nextSorting)
    },
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-x-auto rounded-xl border border-(--brand-border)">
      <table className="min-w-full divide-y divide-(--brand-border) text-sm">
        <thead className="bg-(--brand-soft) text-left text-xs uppercase tracking-wider text-slate-600">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort()
                const sortState = header.column.getIsSorted()

                return (
                  <th
                    key={header.id}
                    className="px-4 py-3"
                    aria-sort={
                      sortState === "asc"
                        ? "ascending"
                        : sortState === "desc"
                          ? "descending"
                          : "none"
                    }
                  >
                    {header.isPlaceholder ? null : canSort ? (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 font-semibold"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        <SortIndicator state={sortState} />
                      </button>
                    ) : (
                      <div className="font-semibold">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-(--brand-border) bg-white">
          {isLoading ? (
            <tr>
              <td className="px-4 py-6 text-slate-500" colSpan={7}>
                Loading customers...
              </td>
            </tr>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-(--brand-soft)/60">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-6 text-slate-500" colSpan={7}>
                No customers found for current filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
