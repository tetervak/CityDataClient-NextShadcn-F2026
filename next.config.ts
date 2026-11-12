import type { NextConfig } from "next"

const cityApiUrl = (process.env.CITY_API_URL ?? "http://localhost:8080").replace(
  /\/+$/,
  ""
)

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/cities",
        destination: `${cityApiUrl}/api/cities`,
      },
      {
        source: "/api/cities/:path*",
        destination: `${cityApiUrl}/api/cities/:path*`,
      },
      {
        source: "/",
        destination: "/cities",
      },
    ]
  },
}

export default nextConfig
