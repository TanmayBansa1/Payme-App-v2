import { ChangeEvent } from "react";

export default function Textinput({label, placeholder, onChange}: {label: string, placeholder: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void}){

    return <div className="w-full my-4 mx-4">

        <h3 className="text-md font-semibold my-2">{label}</h3>
        <input type="text" placeholder={placeholder} onChange={onChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-72" />
    </div>
}