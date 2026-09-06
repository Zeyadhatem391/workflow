import { ReactNode } from "react";
import NavBar from "../NavBar";
import SideBar from "../SideBar";

interface Props {
  children: ReactNode;
}

export default function DashbordLayout({ children }: Props) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {" "}
      <NavBar />
      <div className="flex min-h-0 flex-1">
        <SideBar />

        <main className="flex-1 overflow-y-auto bg-app-bg p-4 lg:p-8">
          {children}

          <div className="my-20  lg:mb-5" />
        </main>
      </div>
    </div>
  );
}
