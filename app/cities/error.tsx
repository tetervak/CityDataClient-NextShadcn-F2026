"use client"

import { useRouter } from "next/navigation"
import { startTransition } from "react"
import { Button } from "@/components/ui/button"

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter()

  const handleRetry = () => {
    startTransition(() => {
      router.refresh()
      reset()
    })
  }

  return (
    <main className="p-4 space-y-4">
      <h1 className="my-4 text-3xl font-bold text-blue-500">Error</h1>

      <p className="ms-4 text-2xl text-red-600 font-semibold italic">
        Message: {error.message || "An unexpected error occurred."}
      </p>

      <Button onClick={handleRetry}>
        Try again
      </Button>
    </main>
  )
}