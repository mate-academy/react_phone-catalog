import React from "react"
import { MobileCategory } from "../components/MobileCategory/MobileCategory"
import { useOutletContext } from "react-router-dom";

type ContextType = {
  setActiveAside: (arg: boolean) => void;
  width: number;
  disabledIds: number[];
}



export const HomePageCategory: React.FC = () => {
  const { setActiveAside, width, disabledIds } = useOutletContext<ContextType>();
  return (
  <>
    <MobileCategory setActiveAside={setActiveAside} width={width} disabledIds={disabledIds}/>
  </>
  )
}