"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="text-xl rounded-md p-3 bg-blue-400 text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
