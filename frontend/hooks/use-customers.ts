import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {
  getCustomerById,
  getCustomers,
  type ListCustomersParams,
} from "@/api/customer"

export function useCustomersQuery(params: ListCustomersParams) {
  return useQuery({
    queryKey: ["customers", params],
    queryFn: () => getCustomers(params),
    placeholderData: keepPreviousData,
  })
}

export function useCustomerQuery(id: string) {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => getCustomerById(id),
    enabled: Boolean(id),
    select: (response) => response.data,
  })
}
