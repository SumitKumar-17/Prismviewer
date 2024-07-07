import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import util from "util";

const execPromise = util.promisify(exec);


const DbUrlSchema = z.object({
  schema: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedBody = DbUrlSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { schema } = parsedBody.data;

    const schemaPath = path.join(process.cwd(), "prisma", "schema.prisma");
    
    fs.writeFileSync(schemaPath, schema);

    const { stdout, stderr } = await execPromise("npx prisma db push");
    if (stderr) {
      console.error(stderr);
      return NextResponse.json(
        { error: "Failed to push database schema" },
        { status: 500 }
      );
    }
    // return NextResponse.json({message:schemaPath}, { status: 200 });

    return NextResponse.json({
      message: "Schema updated and database pushed successfully",
      output: stdout,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
