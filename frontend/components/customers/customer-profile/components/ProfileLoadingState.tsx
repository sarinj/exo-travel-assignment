import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileLoadingState() {
  return (
    <div className="space-y-5">
      <Card className="border-(--brand-border)">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <Skeleton className="h-28 w-28 rounded-xl" />
            <div className="space-y-3">
              <Skeleton className="h-9 w-64" />
              <Skeleton className="h-6 w-40" />
            </div>
          </div>
          <Skeleton className="mt-6 h-px w-full" />
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card key={idx} className="border-(--brand-border)">
            <CardContent className="space-y-3 p-5">
              <Skeleton className="h-11 w-11 rounded-lg" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-9 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-(--brand-border)">
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="grid grid-cols-[3rem_1fr_auto] gap-4">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-72" />
                <Skeleton className="h-4 w-96" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
