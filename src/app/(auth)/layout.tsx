import AuthLayout from "@/shared/components/layout/AuthLayout";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function layout({ children }: Props) {
  return <AuthLayout>{children}</AuthLayout>;
}

export default layout;
