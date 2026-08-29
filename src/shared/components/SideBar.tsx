"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { menus } from "../data/sideBar";

export default function SideBar() {
  const pathname = usePathname();

  return (
    <div className="h-full w-18 overflow-y-auto custom-scroll pt-8 pb-16 px-3 ">
     
        <div className="flex flex-col gap-5 mt-5">
          <div>
            <ul className="flex flex-col gap-8">
              {menus.map((menu, index) => {
                const Icon = menu.icon;
                const isActive = pathname === menu.link;

                return (
                  <li key={index}>
                    <Link
                      href={menu.link}
                      className={`group flex items-center justify-center rounded-xl px-1.5 py-2.5 transition-all duration-300 ${
                        isActive
                          ? "bg-blue-700 text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-blue-900"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          isActive
                            ? "text-white"
                            : "opacity-80 transition group-hover:opacity-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
  );
}
