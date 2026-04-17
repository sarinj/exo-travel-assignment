export type ResponseMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type ResponseData<T> = {
  data: T
  meta: ResponseMeta
}
