import { ReactNode } from "react";
import NavBar from "../NavBar";
import SideBar from "../SideBar";

interface Props {
  children: ReactNode;
}

export default function DashbordLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />

      <div className="flex flex-1 overflow-hidden">
        <SideBar />

        <main className="flex-1 overflow-y-auto bg-gray-100/50 dark:bg-zinc-950 p-4 lg:p-8">
          {children}
          <div className="mb-15 lg:mb-5 " />
        </main>
      </div>
    </div>
  );
}