"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCustomerQuery } from "@/hooks/use-customers"

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export default function CustomerProfilePage() {
  const params = useParams<{ id: string }>()
  const customerQuery = useCustomerQuery(params.id)
  const customer = customerQuery.data

  return (
    <main className="app-shell">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-[var(--brand-secondary)]">
            EXO CRM
          </p>
          <h1 className="mt-1 text-3xl font-bold">Customer Profile</h1>
        </div>
        <Button asChild variant="outline">
          <Link href="/customers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to List
          </Link>
        </Button>
      </div>

      {customerQuery.isLoading ? (
        <Card>
          <CardContent className="pt-6 text-sm text-slate-500">
            Loading customer profile...
          </CardContent>
        </Card>
      ) : customer ? (
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>{customer.name}</CardTitle>
              <p className="text-sm text-slate-500">{customer.company}</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="metric-card">
                  <p>Active since</p>
                  <strong>{customer.active_since}</strong>
                </div>
                <div className="metric-card">
                  <p>Credit status</p>
                  <strong>{customer.credit_status}</strong>
                </div>
                <div className="metric-card">
                  <p>Total spend</p>
                  <strong>{currency(customer.total_spend)}</strong>
                </div>
                <div className="metric-card">
                  <p>Purchases</p>
                  <strong>{customer.number_of_purchases}</strong>
                </div>
              </div>

              <div className="mt-5 grid gap-2 rounded-xl border border-[var(--brand-border)] p-4 text-sm">
                <p>
                  <span className="font-semibold">Email:</span> {customer.email}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {customer.phone}
                </p>
                <p>
                  <span className="font-semibold">Salesperson:</span>{" "}
                  {customer.salesperson}
                </p>
                <p>
                  <span className="font-semibold">Last activity:</span>{" "}
                  {new Date(customer.last_activity).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {customer.recent_activity.slice(0, 5).map((item, index) => (
                  <li
                    key={`${item.action}-${index}`}
                    className="rounded-lg border border-[var(--brand-border)] px-3 py-2"
                  >
                    <p className="font-medium">{item.action}</p>
                    <p className="text-xs text-slate-500">{item.time}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <Badge
                  className={
                    customer.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }
                >
                  {customer.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6 text-sm text-red-600">
            Customer not found.
          </CardContent>
        </Card>
      )}
    </main>
  )
}
