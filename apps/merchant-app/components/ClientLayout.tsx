"use client";

import { Toaster } from "react-hot-toast";
import AppbarClient from "./AppbarClient";

type Props = {
  children: React.ReactNode | React.ReactNode[] | null | undefined;
};

export default function ClientLayout({ children }: Props) {
  return (
    <>
      <AppbarClient />
      {children}
      <Toaster position="top-right" />
    </>
  );
} 