"use client"

import { useQuery } from "@tanstack/react-query"
import { TableIcon } from "lucide-react"
import Link from "next/link"
import { use } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCity } from "@/lib/cities"

interface CityDetailsPageProps {
  params: Promise<{ id: string }>
}

export default function CityDetailsPage({ params }: CityDetailsPageProps) {
  const { id } = use(params)
  const {
    data: city,
    error,
    isError,
    isPending,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["city", id],
    queryFn: () => getCity(id),
  })

  return (
    <>
      <h1 className="my-4 text-3xl font-bold text-blue-500">City Details</h1>
      {isPending && <p role="status">Loading city...</p>}
      {isError && (
        <div role="alert">
          <p>Failed to load city: {error.message}</p>
          <Button className="mt-2" onClick={() => void refetch()}>
            Retry
          </Button>
        </div>
      )}
      {isSuccess && city === null && (
        <div>
          <p role="status">City not found.</p>
          <Link href="/">
            <Button className="mt-4">
              <TableIcon />
              List Cities
            </Button>
          </Link>
        </div>
      )}
      {isSuccess && city && (
        <>
          <Card className="max-w-md p-6">
            <CardHeader>
              <CardTitle className="text-3xl text-orange-500">
                {city.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p>
                <span className="text-xl font-bold">Country:</span>
                <span className="ml-2 text-xl text-indigo-500 italic">
                  {city.country}
                </span>
              </p>
              <p>
                <span className="text-xl font-bold">Population:</span>
                <span className="ml-2 text-xl text-indigo-500 italic">
                  {city.population.toLocaleString()}
                </span>
              </p>
              <p>
                <span className="text-xl font-bold">Area:</span>
                <span className="ml-2 text-xl text-indigo-500 italic">
                  {city.area.toLocaleString()}
                </span>
              </p>
              <p>
                <span className="text-xl font-bold">Capital:</span>
                <span className="ml-2 text-xl text-indigo-500 italic">
                  {city.capital ? "Yes" : "No"}
                </span>
              </p>
            </CardContent>
          </Card>

          <Link href="/">
            <Button className="mt-4">
              <TableIcon />
              List Cities
            </Button>
          </Link>
        </>
      )}
    </>
  )
}
