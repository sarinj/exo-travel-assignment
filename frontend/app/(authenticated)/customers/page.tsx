import { Suspense } from "react"
import CustomerPage from "@/components/customers/CustomerPage"

export default function CustomersPage() {
  return (
    <Suspense
      fallback={<div className="app-shell p-4">Loading customers...</div>}
    >
      <CustomerPage />
    </Suspense>
  )
}
