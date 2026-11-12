# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

## Running the app

The city pages fetch data in the browser through the same-origin `/api/cities`
path. Next.js proxies those requests to `http://localhost:8080` by default.
Set `CITY_API_URL` to the backend base URL before starting Next.js if the API is
running elsewhere.

Run the app with `npm run dev` and run the city API tests with `npm test`.
