import { Logo } from "@/assets/images/images";
import { BellDot, CircleQuestionMark } from "lucide-react";
import Image from "next/image";

export default function NavBar() {
  return (
    <header className="flex h-18 items-center justify-between pr-6 ">
      <Image src={Logo} alt="logo" height={120} width={150} priority />

      <div className="ml-6 flex items-center gap-6">
        <div className="flex items-center gap-3 border-r-2 border-r-gray-300">
          <button className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-200">
            <CircleQuestionMark className="h-5 w-5 text-gray-600" />
          </button>

          <button className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-200">
            <BellDot className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <div className="flex items-center gap-3 mr-8 ">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-900 text-sm font-semibold text-white">
            ZH
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">
              Zeyad Hatem
            </span>

            <span className="text-xs text-gray-500">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}
