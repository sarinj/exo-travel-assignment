import { apiClient } from "./client"

export type LoginResponse = {
  success: boolean
  token: string
  user: { email: string }
}

export async function loginRequest(email: string, password: string) {
  const response = await apiClient.post<LoginResponse>("/login", {
    email,
    password,
  })

  return response.data
}
