"use client"

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
import { ArrowDown, ArrowUp, ArrowUpDown, UserRound } from "lucide-react"
import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Customer } from "@/api/customer"
import { cn } from "@/lib/utils"
import CustomerTableLoadingRows from "@/components/customers/components/CustomerTableLoadingRows"

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

const avatarTones = [
  "bg-[color-mix(in_oklab,var(--brand-secondary)_40%,white)] text-(--brand-primary)",
  "bg-[color-mix(in_oklab,var(--brand-primary)_18%,white)] text-(--brand-primary)",
  "bg-[color-mix(in_oklab,var(--brand-warning)_30%,white)] text-(--brand-primary)",
]

function getAvatarTone(seed: string) {
  const total = seed
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return avatarTones[total % avatarTones.length]
}

function SortIndicator({ state }: { state: false | "asc" | "desc" }) {
  if (state === "asc") {
    return <ArrowUp className="size-4" />
  }

  if (state === "desc") {
    return <ArrowDown className="size-4" />
  }

  return <ArrowUpDown className="size-4 opacity-70" />
}

export default function CustomerTable({
  data,
  isLoading,
  pageSize,
  sorting,
  onSortingChange,
}: {
  data: Customer[]
  isLoading: boolean
  pageSize: number
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
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                getAvatarTone(row.original.initials),
              )}
            >
              {row.original.initials}
            </div>
            <div>
              <p className="font-semibold text-foreground">
                {row.original.name}
              </p>
              <p className="text-xs text-[color-mix(in_oklab,var(--brand-primary)_48%,white)]">
                {row.original.email}
              </p>
            </div>
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
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--brand-primary)_20%,white)] text-(--brand-primary)">
              <UserRound className="h-3 w-3" />
            </span>
            <span className="text-[15px] text-[color-mix(in_oklab,var(--brand-primary)_72%,white)]">
              {row.original.salesperson}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            className={
              row.original.status === "Active"
                ? "rounded-full bg-[color-mix(in_oklab,var(--brand-secondary)_34%,white)] px-2.5 py-0.5 text-[11px] font-semibold text-(--brand-primary)"
                : "rounded-full bg-[color-mix(in_oklab,var(--brand-warning)_34%,white)] px-2.5 py-0.5 text-[11px] font-semibold text-(--brand-primary)"
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
            <Link
              href={`/customers/${row.original.id}`}
              className="inline-block text-sm font-semibold leading-tight text-(--brand-primary) hover:underline"
            >
              View
              <br />
              Profile
            </Link>
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
    <div className="overflow-x-auto rounded-lg bg-white">
      <table className="w-full min-w-215 divide-y divide-(--brand-border) text-sm">
        <thead className="bg-primary-50 text-left text-xs uppercase tracking-[0.12em] text-primary-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort()
                const sortState = header.column.getIsSorted()
                const isActionColumn = header.column.id === "action"

                return (
                  <th
                    key={header.id}
                    className={cn("px-3 py-4 sm:px-4 sm:py-5 text-right", {
                      "text-left": !isActionColumn,
                    })}
                  >
                    {header.isPlaceholder ? null : canSort ? (
                      <Button
                        variant="ghost"
                        className="h-auto justify-start gap-1.5 p-0 text-xs font-bold leading-none tracking-[0.12em] text-[color-mix(in_oklab,var(--brand-primary)_70%,white)] hover:bg-transparent hover:text-(--brand-primary)"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        <SortIndicator state={sortState} />
                      </Button>
                    ) : (
                      <div
                        className={`text-xs font-bold leading-none tracking-[0.12em] text-[color-mix(in_oklab,var(--brand-primary)_70%,white)] ${isActionColumn ? "text-right" : "text-left"}`}
                      >
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
            <CustomerTableLoadingRows rowCount={pageSize} />
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[color-mix(in_oklab,var(--brand-soft)_42%,white)]"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-3 py-3 align-middle sm:px-4 sm:py-4"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="px-4 py-14 text-center text-slate-500 sm:py-20"
                colSpan={7}
              >
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
