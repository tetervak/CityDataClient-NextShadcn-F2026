import { Button } from "@/components/ui/button"
import { getCity } from "@/lib/cities"
import { notFound } from "next/navigation"
import { City } from "@/types/city"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TableIcon } from "lucide-react"
import Link from "next/link"

interface CityDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function CityDetailsPage({params}: CityDetailsPageProps) {
  const { id } = await params
  const city: City | null = await getCity(id)

  if (!city) {
    notFound()
  }

  return (
    <>
      <h1 className="my-4 text-3xl font-bold text-blue-500">City Details</h1>
      <Card className="max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-3xl text-orange-500">
            {city?.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p>
            <span className="text-xl font-bold">Country:</span>
            <span className="ml-2 text-xl text-indigo-500 italic">
              {city?.country}
            </span>
          </p>
          <p>
            <span className="text-xl font-bold">Population:</span>
            <span className="ml-2 text-xl text-indigo-500 italic">
              {city?.population.toLocaleString()}
            </span>
          </p>
          <p>
            <span className="text-xl font-bold">Area:</span>
            <span className="ml-2 text-xl text-indigo-500 italic">
              {city?.area.toLocaleString()}
            </span>
          </p>
          <p>
            <span className="text-xl font-bold">Capital:</span>
            <span className="ml-2 text-xl text-indigo-500 italic">
              {city?.capital ? "Yes" : "No"}
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
  )
}
