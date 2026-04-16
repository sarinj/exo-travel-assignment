import {
  FileText,
  PhoneCall,
  ReceiptText,
  Sparkles,
  UserPen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RecentActivity } from "@/api/customer"

type ProfileTimelineProps = {
  activity: RecentActivity[]
}

export default function ProfileTimeline({ activity }: ProfileTimelineProps) {
  const timelineIcons = [FileText, UserPen, PhoneCall, ReceiptText, Sparkles]
  const timelineDescriptions = [
    "System generated update from the customer lifecycle workflow.",
    "Profile details were updated through customer relationship actions.",
    "Conversation or support touchpoint recorded in CRM timeline.",
    "Financial activity entry has been logged for this account.",
    "Milestone update captured based on account engagement.",
  ]

  return (
    <Card className="border-(--brand-border)">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-xl font-extrabold text-(--brand-primary)">
          Recent Activity Timeline
        </CardTitle>
        <Button type="button" className="h-8 rounded-full px-4 text-sm">
          View History
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activity.slice(0, 5).map((item, index) => {
            const Icon = timelineIcons[index % timelineIcons.length]

            return (
              <li
                key={`${item.action}-${index}`}
                className="relative grid grid-cols-[3.5rem_1fr_auto] gap-4"
              >
                {index < 4 ? (
                  <span className="absolute top-12 left-7 h-[calc(100%-0.25rem)] w-px bg-(--brand-border)" />
                ) : null}

                <span className="z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--brand-primary)_8%,white)] text-(--brand-primary)">
                  <Icon className="h-5 w-5" />
                </span>

                <div>
                  <p className="text-lg font-bold text-(--brand-primary)">
                    {item.action}
                  </p>
                  <p className="mt-1 text-sm text-[color-mix(in_oklab,var(--brand-primary)_72%,white)]">
                    {timelineDescriptions[index % timelineDescriptions.length]}
                  </p>
                </div>
                <p className="pt-1 text-sm text-[color-mix(in_oklab,var(--brand-primary)_72%,white)]">
                  {item.time}
                </p>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
