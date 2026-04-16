import { Skeleton } from "@/components/ui/skeleton"

type CustomerTableLoadingRowsProps = {
  rowCount: number
}

export default function CustomerTableLoadingRows({
  rowCount,
}: CustomerTableLoadingRowsProps) {
  return Array.from({ length: rowCount }).map((_, rowIndex) => (
    <tr key={`skeleton-row-${rowIndex}`}>
      <td className="px-4 py-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-44" />
        </div>
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-6 w-18 rounded-full" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-18" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-10" />
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end">
          <Skeleton className="h-8 w-26 rounded-md" />
        </div>
      </td>
    </tr>
  ))
}
