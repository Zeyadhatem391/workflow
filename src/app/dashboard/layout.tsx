import DashbordLayout from "@/shared/components/layout/DashbordLayout";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function layout({ children }: Props) {
  return <DashbordLayout>{children}</DashbordLayout>;
}

export default layout;
