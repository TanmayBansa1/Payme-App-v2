import Link from "next/link";

export default function SidebarElement({ href, icon, context }: any) {

  return (
    <Link href={href} className="flex justify-evenly gap-2 hover:bg-gray-200 p-2 cursor-pointer">
        <div>{icon}</div>
        <div className="text-lg font-semibold">{context}</div>
    </Link>
  );
}
