import { Logo } from "@/assets/images/images";
import { BellDot, CircleQuestionMark } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "./NavBar/ThemeToggle";
import AuthUser from "./NavBar/AuthUser";
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="flex h-16 items-center justify-between bg-white px-3 sm:h-18 sm:px-4 lg:px-6 dark:bg-zinc-900">
      <Link href="/" className="shrink-0 transition-opacity hover:opacity-80">
        <Image
          src={Logo}
          alt="Logo"
          priority
          className="h-auto w-[120px] sm:w-[140px]"
        />
      </Link>

      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
        <div className="flex items-center gap-1 border-r border-gray-200 pr-2 sm:gap-2 sm:pr-3 dark:border-zinc-700">
          <ThemeToggle />

          <button
            type="button"
            aria-label="Help"
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 sm:h-10 sm:w-10 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <CircleQuestionMark className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 sm:h-10 sm:w-10 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <BellDot className="h-5 w-5" />
          </button>
        </div>

        <AuthUser />
      </div>
    </header>
  );
}
