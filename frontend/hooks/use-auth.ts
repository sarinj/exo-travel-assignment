import { useMutation } from "@tanstack/react-query"
import { loginRequest } from "@/api/auth"
import type { LoginFormValues } from "@/components/login/components/login-form-schema"

export function useLoginMutation(onSuccess: () => void) {
  return useMutation({
    mutationFn: (values: LoginFormValues) =>
      loginRequest(values.email, values.password),
    onSuccess,
  })
}
