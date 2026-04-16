"use client"

import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLoginMutation } from "@/hooks/use-auth"
import LoginForm from "@/components/login/components/LoginForm"

export default function LoginPage() {
  const router = useRouter()

  const loginMutation = useLoginMutation(() => {
    router.push("/customers")
  })

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md overflow-hidden">
        <CardHeader className="space-y-3 pb-3">
          <div className="logo-wrap">
            <Image
              src="https://storage.googleapis.com/exo24_public/EXO_logo_green.png"
              alt="EXO logo"
              className="brand-logo"
              width={48}
              height={48}
            />
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-(--brand-secondary)">
                EXO CRM
              </p>
              <p className="text-sm text-slate-500">
                Customer Management Console
              </p>
            </div>
          </div>
          <CardTitle>Sign In</CardTitle>
          <p className="text-sm text-slate-500">
            Mock authentication flow for assignment access.
          </p>
        </CardHeader>
        <CardContent>
          <LoginForm
            onSubmit={(values) => loginMutation.mutate(values)}
            isPending={loginMutation.isPending}
            errorMessage={
              loginMutation.isError
                ? "Login failed. Please check backend server status."
                : undefined
            }
          />
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
            <span>Proceed to dashboard after login</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
