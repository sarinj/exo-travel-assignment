import * as React from "react"
import { cn } from "@/lib/utils"

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-(--brand-border) bg-white shadow-[0_18px_45px_rgba(2,79,66,0.08)]",
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("px-4 pt-4 sm:px-6 sm:pt-6", className)} {...props} />
  )
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("text-xl font-bold text-foreground", className)}
      {...props}
    />
  )
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("px-4 pb-4 sm:px-6 sm:pb-6", className)} {...props} />
  )
}
