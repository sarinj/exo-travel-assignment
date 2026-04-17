import { apiClient } from "./client"
import { ResponseData } from "./global.type"

export type RecentActivity = {
  action: string
  time: string
}

export type Customer = {
  id: number
  name: string
  company: string
  initials: string
  active_since: string
  email: string
  phone: string
  salesperson: string
  credit_status: string
  status: string
  total_spend: number
  number_of_purchases: number
  last_activity: string
  recent_activity: RecentActivity[]
}

export type ListCustomersParams = {
  search?: string
  sortBy?:
    | "name"
    | "total_spend"
    | "number_of_purchases"
    | "status"
    | "last_activity"
  order?: "asc" | "desc"
  page?: number
  limit?: number
}

export async function getCustomers(params: ListCustomersParams) {
  const response = await apiClient.get<ResponseData<Customer[]>>("/customers", {
    params,
  })
  console.log(response)
  return response.data
}

export async function getCustomerById(id: string) {
  const response = await apiClient.get<ResponseData<Customer>>(
    `/customers/${id}`,
  )
  console.log(response)
  return response.data
}
