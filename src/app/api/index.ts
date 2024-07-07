import { getDMMF } from "@prisma/internals";
import { NextApiRequest, NextApiResponse } from "next";
import stripAnsi from "strip-ansi";

import { parseDMMFError } from "@/util";
import { ErrorTypes } from "@/util/types";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  try {
    const schema = req.body.schema as string;
    const dmmf = await getDMMF({ datamodel: schema });

    res.json(dmmf.datamodel);
  } catch (err) {
    const message = stripAnsi((err as Error).message);
    let errors: any;
    let errType: ErrorTypes;

    if (message.includes("error: ")) {
      errors = parseDMMFError(message);
      errType = ErrorTypes.Prisma;
    } else {
      console.error(err);

      errors = message;
      errType = ErrorTypes.Other;
    }

    res.status(400).json({ errors, type: errType });
  }
}
