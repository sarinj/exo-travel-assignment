"use client"

import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { useCustomerQuery } from "@/hooks/use-customers"
import ProfileLoadingState from "./components/ProfileLoadingState"
import ProfileOverviewCard from "./components/ProfileOverviewCard"
import ProfileTimeline from "./components/ProfileTimeline"
import ProfileTopBar from "./components/ProfileTopBar"

export default function CustomerProfilePage() {
  const params = useParams<{ id: string }>()
  const { data, isLoading } = useCustomerQuery(params.id)

  let content: React.ReactNode

  if (isLoading) {
    content = <ProfileLoadingState />
  } else if (!data) {
    content = (
      <Card className="border-red-200 bg-red-50/70">
        <CardContent className="pt-6 text-sm text-red-700">
          Customer not found. Please go back to the customer list and try again.
        </CardContent>
      </Card>
    )
  } else {
    content = (
      <div className="space-y-5">
        <ProfileOverviewCard customer={data} />
        <ProfileTimeline activity={data.recent_activity || []} />
      </div>
    )
  }

  return (
    <main className="app-shell space-y-6">
      <ProfileTopBar backHref="/customers" />
      {content}
    </main>
  )
}
