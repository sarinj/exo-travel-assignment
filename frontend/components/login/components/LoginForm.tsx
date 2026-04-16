"use client"

import { Lock, Mail } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginFormSchema, type LoginFormValues } from "./login-form-schema"

interface LoginFormProps {
  formId?: string
  isPending?: boolean
  errorMessage?: string
  onSubmit: (data: LoginFormValues) => void
}

export default function LoginForm({
  formId,
  isPending = false,
  errorMessage,
  onSubmit,
}: LoginFormProps) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "alex.johnson@mail.com",
      password: "password123",
    },
  })

  return (
    <Form {...form}>
      <form
        id={formId}
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
                <FormControl>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    className="pl-9"
                    autoComplete="email"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
                <FormControl>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    className="pl-9"
                    autoComplete="current-password"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Signing in..." : "Login"}
        </Button>
        <Button type="button" variant="secondary" className="w-full">
          Continue with Google
        </Button>
        <div className="pt-1 text-center">
          <a
            href="#"
            className="text-sm font-semibold text-(--brand-primary) hover:underline"
          >
            Forgot password?
          </a>
        </div>
        {errorMessage ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}
      </form>
    </Form>
  )
}
