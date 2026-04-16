"use client"

import { Fragment } from "react"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type CustomerPaginationProps = {
  page: number
  pageSize: number
  total: number
  totalPages: number
  isLoading: boolean
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

function getVisiblePages(currentPage: number, totalPages: number): number[] {
  const safeTotal = Math.max(totalPages, 1)
  const safeCurrent = Math.min(Math.max(currentPage, 1), safeTotal)
  const pages = new Set<number>()

  for (let i = 1; i <= Math.min(3, safeTotal); i += 1) {
    pages.add(i)
  }

  pages.add(safeCurrent)

  const lastStart = Math.max(safeTotal - 2, 1)
  for (let i = lastStart; i <= safeTotal; i += 1) {
    pages.add(i)
  }

  return Array.from(pages).sort((a, b) => a - b)
}

export default function CustomerPagination({
  page,
  pageSize,
  total,
  totalPages,
  isLoading,
  onPageChange,
  onPageSizeChange,
}: CustomerPaginationProps) {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)
  const visiblePages = getVisiblePages(page, totalPages)

  return (
    <div className="mt-2 flex flex-col gap-3 px-2 pt-4 pb-2 sm:flex-row sm:items-center sm:justify-between sm:px-3">
      <div className="text-xs text-[color-mix(in_oklab,var(--brand-primary)_62%,white)] sm:text-sm">
        Showing {start}-{end} of {total} customers
      </div>

      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600" htmlFor="page-size">
            Rows per page
          </label>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => onPageSizeChange(Number(value))}
            disabled={isLoading}
          >
            <SelectTrigger id="page-size" className="w-20 bg-white">
              <SelectValue placeholder="Rows" />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Pagination className="mx-0 w-full justify-start overflow-x-auto sm:w-auto">
          <PaginationContent className="min-w-max flex-nowrap">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                aria-disabled={isLoading || page <= 1}
                className={
                  isLoading || page <= 1
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
                onClick={(event) => {
                  event.preventDefault()
                  if (!isLoading && page > 1) {
                    onPageChange(page - 1)
                  }
                }}
              />
            </PaginationItem>

            {visiblePages.map((pageNumber, index) => {
              const previousPage = visiblePages[index - 1]
              const showEllipsis =
                previousPage !== undefined && pageNumber - previousPage > 1

              return (
                <Fragment key={pageNumber}>
                  {showEllipsis ? (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : null}
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      size="sm"
                      isActive={pageNumber === page}
                      aria-disabled={isLoading || pageNumber === page}
                      className={
                        isLoading || pageNumber === page
                          ? "pointer-events-none opacity-50"
                          : undefined
                      }
                      onClick={(event) => {
                        event.preventDefault()
                        if (!isLoading && pageNumber !== page) {
                          onPageChange(pageNumber)
                        }
                      }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                </Fragment>
              )
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                aria-disabled={isLoading || page >= totalPages}
                className={
                  isLoading || page >= totalPages
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
                onClick={(event) => {
                  event.preventDefault()
                  if (!isLoading && page < totalPages) {
                    onPageChange(page + 1)
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
