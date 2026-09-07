import { Logo } from "@/assets/images/images";
import { BellDot, CircleQuestionMark } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "./NavBar/ThemeToggle";
import AuthUser from "./NavBar/AuthUser";
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="flex h-16 items-center justify-between bg-layout-bg px-3 sm:h-18 sm:px-4 lg:px-6">
      <Link href="/" className="shrink-0 transition-opacity hover:opacity-80">
        <Image
          src={Logo}
          alt="Logo"
          priority
          className="h-auto w-[120px] sm:w-[140px]"
        />
      </Link>

      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
        <div className="flex items-center gap-1 border-r border-app-border pr-2 sm:gap-2 sm:pr-3">
          <ThemeToggle />

          <Link href="/dashboard/settings?tab=info">
            <button
              type="button"
              aria-label="Help"
              className="flex h-9 w-9 items-center justify-center rounded-full text-app-icon transition hover:bg-white/10 hover:text-app-icon-hover sm:h-10 sm:w-10 cursor-pointer"
            >
              <CircleQuestionMark className="h-5 w-5" />
            </button>
          </Link>
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-app-icon transition hover:bg-white/10 hover:text-app-icon-hover sm:h-10 sm:w-10 cursor-pointer"
          >
            <BellDot className="h-5 w-5" />
          </button>
        </div>

        <AuthUser />
      </div>
    </header>
  );
}
