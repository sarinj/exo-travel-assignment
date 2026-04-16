import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

type ProfileTopBarProps = {
  backHref: string
}

export default function ProfileTopBar({ backHref }: ProfileTopBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-(--brand-primary)">
        <ArrowLeft className="h-4 w-4" />
        <Link href={backHref} className="text-sm font-semibold hover:underline">
          Back to List
        </Link>
      </div>
      <div className="grid w-full grid-cols-1 gap-2 sm:flex sm:w-auto sm:items-center sm:gap-3">
        <Button
          type="button"
          variant="secondary"
          className="h-9 w-full px-5 text-sm sm:w-auto"
        >
          Edit Profile
        </Button>
        <Button type="button" className="h-9 w-full px-5 text-sm sm:w-auto">
          Add Note
        </Button>
      </div>
    </div>
  )
}
