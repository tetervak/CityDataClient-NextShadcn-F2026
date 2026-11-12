"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getCities } from "@/lib/cities"

export default function CityListPage() {
  const {
    data: cities = [],
    error,
    isError,
    isPending,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  })

  return (
    <>
      <h1 className="my-4 text-3xl font-bold text-blue-500">City List</h1>
      {isPending && <p role="status">Loading cities...</p>}
      {isError && (
        <div role="alert">
          <p>Failed to load cities: {error.message}</p>
          <Button className="mt-2" onClick={() => void refetch()}>
            Retry
          </Button>
        </div>
      )}
      {isSuccess &&
        (cities.length === 0 ? (
          <p>No cities found.</p>
        ) : (
          <Card className="max-w-xl">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Population</TableHead>
                    <TableHead>Country</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cities.map((city) => (
                    <TableRow key={city.cityId}>
                      <TableCell>
                        <Link href={`/cities/${city.cityId}`}>
                          <Button variant="link">{city.name}</Button>
                        </Link>
                      </TableCell>
                      <TableCell>{city.population.toLocaleString()}</TableCell>
                      <TableCell>{city.country}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
    </>
  )
}
