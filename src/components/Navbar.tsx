// import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Button, buttonVariants } from '@/components/ui/button'
import { IconGitHub } from "./ui/icons";


export default function Navbar() {
  return (
    <>
      <nav className="fixed z-20 h-[69px] w-full bg-background p-4">
        <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight">
            PrismViewer
          </Link>
          {/* <ThemeToggle /> */}

      <div className="flex items-center justify-end gap-2">
      <Button asChild size="sm" className="rounded-lg gap-1">
          <a
            href="https://github.com/SumitKumar-17/Prismviewer"
            target="_blank"
          >
            <IconGitHub className="size-3" />
            <span className="hidden sm:block">Visit Repository</span>
            <span className="sm:hidden">Repository</span>
          </a>
        </Button>
        <Button asChild size="sm" className="rounded-lg gap-1">
          <a
            href="https://github.com/SumitKumar-17"
            target="_blank"
          >
            <IconGitHub className="size-3" />
            <span className="hidden sm:block">Visit Github</span>
            <span className="sm:hidden">Github</span>
          </a>
        </Button>
      </div>
        </div>
      </nav>
      <div className="relative h-[69px] w-full"></div>
    </>
  );
}