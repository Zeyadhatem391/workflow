"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { menus } from "../data/sideBar";

export default function SideBar() {
  const pathname = usePathname();

  return (
    <>
      {/* ================= Desktop Sidebar ================= */}
      <aside className="hidden h-full w-18 bg-white px-3 pb-16 pt-8 md:block dark:bg-zinc-900">
        <div className="mt-5 flex flex-col gap-5">
          <ul className="flex flex-col gap-8">
            {menus.map((menu, index) => {
              const Icon = menu.icon;
              const isActive = pathname === menu.link;

              return (
                <li key={index}>
                  <Link
                    href={menu.link}
                    title={menu.name}
                    className={`group flex items-center justify-center rounded-xl px-1.5 py-2.5 transition-all duration-300 ${
                      isActive
                        ? "bg-blue-700 text-white shadow-sm"
                        : "text-gray-500 hover:bg-gray-100 hover:text-blue-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-blue-400"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 transition-all ${
                        isActive
                          ? "text-white"
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

      {/* ================= Mobile Bottom Navigation ================= */}
      <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white px-2 py-2 md:hidden dark:border-zinc-800 dark:bg-zinc-900">
        <ul className="flex items-center justify-around">
          {menus.map((menu, index) => {
            const Icon = menu.icon;
            const isActive = pathname === menu.link;

            return (
              <li key={index} className="flex-1">
                <Link
                  href={menu.link}
                  className={`mx-auto flex w-fit flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 transition-all ${
                    isActive
                      ? "bg-blue-700 text-white"
                      : "text-gray-500 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  }`}
                >
                  <Icon className="h-5 w-5" />

                
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}