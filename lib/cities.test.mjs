import assert from "node:assert/strict"
import { afterEach, test } from "node:test"

import { getCities, getCity } from "./cities.ts"

const originalFetch = globalThis.fetch

afterEach(() => {
  globalThis.fetch = originalFetch
})

test("getCities returns the city list from the API", async () => {
  const cities = [{ cityId: "1", name: "Toronto" }]
  globalThis.fetch = async (url) => {
    assert.equal(url, "/api/cities")
    return Response.json(cities)
  }

  assert.deepEqual(await getCities(), cities)
})

test("getCities rejects unsuccessful API responses", async () => {
  globalThis.fetch = async () => new Response(null, { status: 500 })

  await assert.rejects(getCities(), /Failed to fetch cities/)
})

test("getCity returns null when the city does not exist", async () => {
  globalThis.fetch = async () => new Response(null, { status: 404 })

  assert.equal(await getCity("missing"), null)
})

test("getCity encodes the city ID in its API request", async () => {
  const city = { cityId: "north/east", name: "North East" }
  globalThis.fetch = async (url) => {
    assert.equal(url, "/api/cities/north%2Feast")
    return Response.json(city)
  }

  assert.deepEqual(await getCity("north/east"), city)
})