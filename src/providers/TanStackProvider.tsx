'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Toaster } from "../components/ui/sonner"

export function TanStackProvider({ children }: { children: React.ReactNode }) {
  const [queryClient, setQueryClient] = useState<QueryClient | null>(null)

  useEffect(() => {
    setQueryClient(new QueryClient())
  }, [])

  if (!queryClient) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
          },
          descriptionClassName: "text-sm text-black dark:text-black",
        }}
      />
      {children}
    </QueryClientProvider>
  )
}
