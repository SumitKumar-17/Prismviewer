import { Terminal } from "lucide-react"

import {
    //@ts-ignore
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertDetails() {
  return (
    <>
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Do not use online !</AlertTitle>
      <AlertDescription>
        You can use this online for that you will be needing to open a specific port of your system to the internet,which is risky.
      </AlertDescription>
    </Alert>
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>For pushing the schema </AlertTitle>
      <AlertDescription>
       Take your prisma.schema and paste into the prisma folder of this project.
       Then click on the Push button.
      </AlertDescription>
    </Alert>
    </>
  )
}
