import { Button } from "@/components/ui/button"
import { City } from "@/types/city"
import { getCities } from "@/lib/cities"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default async function CityListPage() {
  const cities: City[] = await getCities()
  return (
    <>
      <h1 className="my-4 text-3xl font-bold text-blue-500">City List</h1>
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
              {cities.map((city: City) => (
                <TableRow key={city.cityId}>
                  <TableCell>
                    <Link href={`/cities/${city.cityId}`}>
                      <Button variant="link">
                        {city.name}
                      </Button>
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
    </>
  )
}
