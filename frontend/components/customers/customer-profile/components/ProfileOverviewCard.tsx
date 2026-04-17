import { CalendarDays, NotebookPen, ShoppingBag, Wallet } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Customer } from "@/api/customer"
import { cn } from "@/lib/utils"

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

type ProfileOverviewCardProps = {
  customer: Customer
}

export default function ProfileOverviewCard({
  customer,
}: ProfileOverviewCardProps) {
  return (
    <>
      <Card className="border-(--brand-border)">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex min-w-0 flex-col items-start gap-4 sm:flex-row sm:gap-5">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl bg-gray-300 sm:h-32 sm:w-32">
                  <span className="text-2xl font-extrabold text-white sm:text-3xl">
                    {customer.initials}
                  </span>
                </div>
              </div>

              <div className="min-w-0 pt-1">
                <h1 className="truncate text-xl font-extrabold tracking-tight text-(--brand-primary) sm:text-3xl">
                  {customer.name}
                </h1>
                <p className="mt-2 text-base text-primary-600 sm:text-lg">
                  {customer.company}
                </p>
              </div>
            </div>

            <Badge
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                {
                  "bg-success-bg text-(--brand-primary)":
                    customer.status === "Active",
                  "bg-warning-bg text-(--brand-primary)":
                    customer.status !== "Active",
                },
              )}
            >
              {customer.status === "Active"
                ? "ACTIVE ACCOUNT"
                : "INACTIVE ACCOUNT"}
            </Badge>
          </div>

          <div className="my-6 h-px w-full bg-(--brand-border)" />

          <div className="grid gap-4 text-sm md:grid-cols-3">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-primary-500 uppercase">
                Email Address
              </p>
              <p className="mt-2 break-all text-base font-semibold text-(--brand-primary) sm:text-lg">
                {customer.email}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-primary-500 uppercase">
                Direct Phone
              </p>
              <p className="mt-2 text-base font-semibold text-(--brand-primary) sm:text-lg">
                {customer.phone}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-primary-500 uppercase">
                Salesperson
              </p>
              <p className="mt-2 text-base font-semibold text-(--brand-primary) sm:text-lg">
                {customer.salesperson}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-(--brand-border)">
          <CardContent className="space-y-4 p-5">
            <div className="flex items-start justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-(--brand-primary)">
                <Wallet className="h-5 w-5" />
              </span>
            </div>
            <p className="text-xs font-bold tracking-[0.14em] text-primary-500 uppercase">
              Total Spend
            </p>
            <p className="text-2xl font-extrabold text-(--brand-primary)">
              {currency(customer.total_spend)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-(--brand-border)">
          <CardContent className="space-y-4 p-5">
            <div className="flex items-start justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-(--brand-primary)">
                <ShoppingBag className="h-5 w-5" />
              </span>
            </div>
            <p className="text-xs font-bold tracking-[0.14em] text-primary-500 uppercase">
              Total Purchases
            </p>
            <p className="text-2xl font-extrabold text-(--brand-primary)">
              {customer.number_of_purchases}
            </p>
          </CardContent>
        </Card>

        <Card className="border-(--brand-border) bg-(--brand-primary) text-white">
          <CardContent className="space-y-4 p-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
              <CalendarDays className="h-5 w-5" />
            </span>
            <p className="text-xs font-bold tracking-[0.14em] text-white/75 uppercase">
              Active Since
            </p>
            <p className="text-2xl font-extrabold">{customer.active_since}</p>
          </CardContent>
        </Card>

        <Card className="border-(--brand-border)">
          <CardContent className="space-y-4 p-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-(--brand-primary)">
              <NotebookPen className="h-5 w-5" />
            </span>
            <p className="text-xs font-bold tracking-[0.14em] text-primary-500 uppercase">
              Credit Status
            </p>
            <p className="flex items-center gap-2 text-xl font-extrabold text-(--brand-primary)">
              <span className="h-2.5 w-2.5 rounded-full bg-(--brand-secondary)" />
              {customer.credit_status}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
