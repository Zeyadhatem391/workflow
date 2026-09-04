"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { menus } from "../data/sideBar";

export default function SideBar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden h-full w-18 shrink-0 bg-layout-bg px-3 pb-16 pt-8 md:block">
        <div className="mt-5 flex flex-col gap-5">
          <ul className="flex flex-col gap-8">
            {menus.map((menu) => {
              const Icon = menu.icon;
              const isActive = pathname === menu.link;

              return (
                <li key={menu.link}>
                  <Link
                    href={menu.link}
                    title={menu.name}
                    className={`group flex items-center justify-center rounded-xl px-1.5 py-2.5 transition-all duration-300 ${
                      isActive
                        ? "bg-menu-active-bg text-menu-active-text shadow-sm"
                        : "text-app-icon hover:bg-menu-hover-bg hover:text-app-icon-hover"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 transition-all duration-300 ${
                        isActive
                          ? "text-menu-active-text"
                          : "opacity-80 group-hover:opacity-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-app-border bg-layout-bg px-2 py-2 md:hidden">
        <ul className="flex items-center justify-around">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive = pathname === menu.link;

            return (
              <li key={menu.link} className="flex-1">
                <Link
                  href={menu.link}
                  title={menu.name}
                  className={`mx-auto flex w-fit flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 transition-all duration-300 ${
                    isActive
                      ? "bg-menu-active-bg text-menu-active-text shadow-sm"
                      : "text-app-icon hover:bg-menu-hover-bg hover:text-app-icon-hover"
                  }`}
                >
                  <Icon className="h-5 w-5 transition-all duration-300" />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}