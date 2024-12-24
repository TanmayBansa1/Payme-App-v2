"use client";

import { ReactNode } from "react";
import AppbarClient from "./AppbarClient";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppbarClient />
      {children}
      <Toaster position="top-right" />
    </>
  );
} 