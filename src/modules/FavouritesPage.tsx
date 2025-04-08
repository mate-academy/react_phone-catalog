import React from "react";
import { Header } from "../components/Header/Header"
import { useOutletContext } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import { Favourites } from '../components/Favourites/Favourites';

type ContextType = {
  setActiveAside: (arg: boolean) => void;
  width: number;
  disabledIds: number[];
}

export const FavouritesPage: React.FC = () => {
  const { setActiveAside, width, disabledIds } = useOutletContext<ContextType>();
  return (
    <>
      <Header setActiveAside={setActiveAside} width={width} />
      <Favourites />
      <Footer disabledIds={disabledIds} />
    </>
  )
}