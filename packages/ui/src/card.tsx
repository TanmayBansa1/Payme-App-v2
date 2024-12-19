import { type JSX } from "react";

export function Card({
  title,
  children,

}: {
  title: string;
  children: React.ReactNode;

}): JSX.Element {
  return (
    <div className="pl-6 w-full flex flex-col">
      <h2 className="font-bold text-xl ">
        {title} 
      </h2>
      <div>
        {children}
      </div>
    </div>
  );
}
