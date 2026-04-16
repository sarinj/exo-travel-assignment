import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

type ProfileTopBarProps = {
  backHref: string
}

export default function ProfileTopBar({ backHref }: ProfileTopBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-(--brand-primary)">
        <ArrowLeft className="h-4 w-4" />
        <Link href={backHref} className="text-sm font-semibold hover:underline">
          Back to List
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Button type="button" variant="secondary" className="h-9 px-5 text-sm">
          Edit Profile
        </Button>
        <Button type="button" className="h-9 px-5 text-sm">
          Add Note
        </Button>
      </div>
    </div>
  )
}
