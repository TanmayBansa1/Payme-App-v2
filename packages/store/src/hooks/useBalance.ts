import { useRecoilValue } from "recoil"
import { balance } from "../atoms/balance";


export const useBalance = ()=>{
    const value = useRecoilValue(balance)
    return value;
}