import * as React from "react";
import SidebarElement from "../../components/SidebarElement";

export default function Layout({children}: {children: React.ReactNode}){

    return <div className="flex border-2">
        <div className="flex flex-col w-56 min-h-screen border-r border-slate-400 pt-24 ">
            <SidebarElement icon={<HomeIcon/>} title="Home" href="/dashboard" />
            <SidebarElement icon={<TransferIcon/>} title="Transfer" href="/transfer" />
            <SidebarElement icon={<TransactionsIcon/>} title="Transactions" href="/transactions" />  
            <SidebarElement icon={<P2PIcon/>} title="P2P Transfer" href="/p2p" />  
        </div>
        <div className="flex-1">
            {children}
        </div>
    </div>
}

function HomeIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
}
function TransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
}

function TransactionsIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
  
}
function P2PIcon() {
    return <svg className="h-6 w-6 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  stroke-linejoin="round">  <polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
}
