import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <div className="relative">
      <input
        type={isVisible ? "text" : "password"}
        className={cn(
          "flex h-10 w-full rounded-lg border border-(--brand-border) bg-white px-3 py-2 pr-10 text-sm text-foreground placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-primary)",
          className,
        )}
        ref={ref}
        {...props}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex w-10 cursor-pointer items-center justify-center text-slate-500 disabled:pointer-events-none disabled:opacity-50"
        onClick={() => setIsVisible((value) => !value)}
        aria-label={isVisible ? "Hide password" : "Show password"}
        disabled={props.disabled}
      >
        {isVisible ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  )
})

PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
