import Link from "next/link";

export default function SidebarElement({ href, icon, title }: any) {

  return (
    <Link href={href} className="flex pl-8 gap-8 hover:bg-gray-200 p-2 cursor-pointer">
        <div>{icon}</div>
        <div className="text-lg font-semibold">{title}</div>
    </Link>
  );
}
