"use client"

import { useCallback, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"

type ParamValue = string | number | boolean | undefined | null
type ParamArrayValue = string[] | number[]
type AnyParamValue = ParamValue | ParamArrayValue

interface UseURLSearchParamsOptions<T> {
  /**
   * Default values for params when not present in URL
   */
  defaultParams?: Partial<T>
  /**
   * If true, removes params with undefined/null values from URL
   * @default true
   */
  removeEmptyParams?: boolean
  /**
   * If true, hides params that match their default values from URL
   * @default true
   */
  hideDefaultValues?: boolean
  /**
   * If true, prevents page scrolling when updating URL
   * @default false
   */
  scroll?: boolean
}

/**
 * Custom hook for managing URL search parameters
 * @template T - Type of the parameters object
 * @param options - Configuration options
 * @returns Object containing current params and update function
 */
export function useURLSearchParams<T extends Record<string, AnyParamValue>>(
  options: UseURLSearchParamsOptions<T> = {},
) {
  const {
    defaultParams = {},
    removeEmptyParams = true,
    hideDefaultValues = true,
    scroll = false,
  } = options
  const router = useRouter()
  const searchParams = useSearchParams()

  /**
   * Check if two values are equal (handles arrays)
   */
  const isEqual = (a: AnyParamValue, b: AnyParamValue): boolean => {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.length === b.length && a.every((v, i) => v === b[i])
    }
    return a === b
  }

  /**
   * Parse a single value from URL
   */
  const parseValue = (value: string): ParamValue => {
    // Try to parse as number (but not empty strings)
    if (value !== "" && !isNaN(Number(value))) {
      return Number(value)
    }
    // Parse boolean
    if (value === "true" || value === "false") {
      return value === "true"
    }
    // Keep as string
    return value
  }

  /**
   * Parse current URL search params into typed object
   */
  const params = useMemo(() => {
    const result: Record<string, AnyParamValue> = { ...defaultParams }

    // Group values by key to detect arrays
    const grouped: Record<string, string[]> = {}
    searchParams.forEach((value, key) => {
      if (!grouped[key]) {
        grouped[key] = []
      }
      grouped[key].push(value)
    })

    // Parse grouped values
    Object.entries(grouped).forEach(([key, values]) => {
      if (values.length === 1) {
        // Single value
        result[key] = parseValue(values[0])
      } else {
        // Multiple values = array
        result[key] = values.map(parseValue) as string[] | number[]
      }
    })

    return result as T
  }, [searchParams, defaultParams])

  /**
   * Add a value to URLSearchParams (handles arrays)
   */
  const appendValue = useCallback(
    (urlParams: URLSearchParams, key: string, value: AnyParamValue) => {
      if (removeEmptyParams && (value === undefined || value === null)) {
        return
      }

      // Skip if value matches default
      if (hideDefaultValues && key in defaultParams) {
        const defaultValue = defaultParams[key as keyof typeof defaultParams]
        if (isEqual(value, defaultValue)) {
          return
        }
      }

      if (Array.isArray(value)) {
        // Append each array item as separate param
        value.forEach((item) => {
          if (item !== undefined && item !== null) {
            urlParams.append(key, String(item))
          }
        })
      } else if (value !== undefined && value !== null) {
        urlParams.set(key, String(value))
      }
    },
    [removeEmptyParams, hideDefaultValues, defaultParams],
  )

  /**
   * Update URL search params
   * @param newParams - Partial object with params to update
   * @param replace - If true, uses router.replace instead of router.push
   */
  const updateParams = useCallback(
    (newParams: Partial<T>, replace = false) => {
      const urlParams = new URLSearchParams()

      // Merge existing params with new params
      const mergedParams = { ...params, ...newParams }

      // Build URL params
      Object.entries(mergedParams).forEach(([key, value]) => {
        appendValue(urlParams, key, value)
      })

      const queryString = urlParams.toString()
      const url = queryString ? `?${queryString}` : window.location.pathname

      if (replace) {
        router.replace(url, { scroll })
      } else {
        router.push(url, { scroll })
      }
    },
    [params, router, scroll, appendValue],
  )

  /**
   * Set params (replaces all existing params)
   * @param newParams - Complete params object
   * @param replace - If true, uses router.replace instead of router.push
   */
  const setParams = useCallback(
    (newParams: Partial<T>, replace = false) => {
      const urlParams = new URLSearchParams()

      // Build URL params from scratch
      Object.entries(newParams).forEach(([key, value]) => {
        appendValue(urlParams, key, value)
      })

      const queryString = urlParams.toString()
      const url = queryString ? `?${queryString}` : window.location.pathname

      if (replace) {
        router.replace(url, { scroll })
      } else {
        router.push(url, { scroll })
      }
    },
    [router, scroll, appendValue],
  )

  /**
   * Remove specific params from URL
   * @param keys - Array of param keys to remove
   * @param replace - If true, uses router.replace instead of router.push
   */
  const removeParams = useCallback(
    (keys: (keyof T)[], replace = false) => {
      const urlParams = new URLSearchParams()

      // Add all existing params except the ones to remove
      searchParams.forEach((value, key) => {
        if (!keys.includes(key as keyof T)) {
          urlParams.set(key, value)
        }
      })

      const queryString = urlParams.toString()
      const url = queryString ? `?${queryString}` : window.location.pathname

      if (replace) {
        router.replace(url, { scroll })
      } else {
        router.push(url, { scroll })
      }
    },
    [searchParams, router, scroll],
  )

  /**
   * Clear all URL search params
   * @param replace - If true, uses router.replace instead of router.push
   */
  const clearParams = useCallback(
    (replace = false) => {
      if (replace) {
        router.replace(window.location.pathname, { scroll })
      } else {
        router.push(window.location.pathname, { scroll })
      }
    },
    [router, scroll],
  )

  /**
   * Get a specific param value
   * @param key - The param key to get
   * @returns The param value or undefined
   */
  const getParam = useCallback(
    (key: keyof T): AnyParamValue => {
      return params[key]
    },
    [params],
  )

  return {
    params,
    updateParams,
    setParams,
    removeParams,
    clearParams,
    getParam,
  }
}
