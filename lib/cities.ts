import type { City } from "@/types/city"

const API_URL = "/api/cities"

export async function getCities(): Promise<City[]> {
  const response = await fetch(API_URL, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch cities")
  }

  return response.json()
}

export async function getCity(id: string): Promise<City | null> {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    cache: "no-store",
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error("Failed to fetch city")
  }

  return response.json()
}
