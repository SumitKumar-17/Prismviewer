import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);
let studioProcess: ReturnType<typeof exec> | null = exec('npx prisma studio');

export async function GET(req: NextRequest) {
  try {
    if (studioProcess) {
      return NextResponse.json({ message: 'Prisma Studio is already running' });
    }

    studioProcess = exec('npx prisma studio');
    studioProcess.stdout?.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    studioProcess.stderr?.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    studioProcess.on('close', (code) => {
      console.log(`Prisma Studio process exited with code ${code}`);
      studioProcess = null; // Reset the process reference on close
    });

    return NextResponse.json({ message: 'Prisma Studio opened successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!studioProcess) {
      return NextResponse.json({ message: 'Prisma Studio is not running' });
    }

    // Forcefully kill the Prisma Studio process
    if (studioProcess.pid) {
      exec('kill -9 $(lsof -t -i:5555)')
    }

    studioProcess = null;
    return NextResponse.json({ message: 'Prisma Studio stopped successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
