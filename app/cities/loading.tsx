import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="flex align-text-bottom text-blue-500 text-4xl italic">
      <Spinner className="size-10 mr-4"/>Loading ...
    </div>
  )
}
