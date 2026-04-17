"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useLoginMutation } from "@/hooks/use-auth"
import LoginForm from "@/components/login/components/LoginForm"

export default function LoginPage() {
  const router = useRouter()

  const { mutate, isPending, isError } = useLoginMutation(() => {
    router.push("/customers")
  })

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md overflow-hidden">
        <CardHeader className="space-y-3 pb-3">
          <div className="flex justify-center items-center gap-2">
            <Image
              src="/EXO_logo_green.png"
              alt="EXO logo"
              width={150}
              height={48}
              loading="eager"
            />
          </div>
        </CardHeader>
        <CardContent>
          <LoginForm
            onSubmit={(values) => mutate(values)}
            isPending={isPending}
            errorMessage={
              isError ? "Failed to login. Please try again." : undefined
            }
          />
        </CardContent>
      </Card>
    </main>
  )
}
