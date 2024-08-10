/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useRef, useState } from "react";
import { Image } from "../types/image";

type Props = {
  children: ReactNode;
};

type AppContextProps = {
  bannerImages: Image[];
  chosenBanner: number;
  colors: { [key: string]: string };
  isBurgerOpen: boolean;
  handleChangeBannerImage: (callback: number) => void;
  handleClickSwitchBurger: () => void;
  homeBannerEl: React.RefObject<HTMLElement>;
};

const AppContext = createContext({} as AppContextProps);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("Context must be used within an AppContextContainer");
  }

  return context;
};

const bannerImages: Image[] = [
  {
    id: 0,
    src: "/react_phone-catalog/public/img/bannerHome/Banner-1",
    color: "#000fff",
  },
  {
    id: 1,
    src: "/react_phone-catalog/public/img/bannerHome/Banner-1",
    color: "#a7f300",
  },
  {
    id: 2,
    src: "/react_phone-catalog/public/img/bannerHome/Banner-1",
    color: "#c4c4c4",
  },
  {
    id: 3,
    src: "/react_phone-catalog/public/img/bannerHome/Banner-1",
    color: "#a6b8d0",
  },
  {
    id: 4,
    src: "/react_phone-catalog/public/img/bannerHome/Banner-1",
    color: "#e4c0c0",
  },
  {
    id: 5,
    src: "/react_phone-catalog/public/img/bannerHome/Banner-1",
    color: "#00ff00",
  },
  {
    id: 6,
    src: "/react_phone-catalog/public/img/bannerHome/Banner-1",
    color: "#00ffc1",
  },
];

const colors = {
  accent: "#f86800",
  secAccent: "#476df4",
  primary: "#0f0f11",
  sec: "#89939a",
  icon: "#b4bdc3",
  elem: "#e2e6e9",
  hoverBg: "#fafbfc",
  white: "#fff",
  green: "#27ae60",
  red: "#eb5757",
};

export const AppContextContainer = ({ children }: Props) => {
  const [chosenBanner, setChosenBanner] = useState<number>(0);
  const homeBannerEl = useRef<HTMLElement>(null);
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);

  const handleChangeBannerImage = (callback: number) => {
    setChosenBanner(callback);
  };

  const handleClickSwitchBurger = () => {
    setIsBurgerOpen((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        colors,
        bannerImages,
        chosenBanner,
        isBurgerOpen,
        handleChangeBannerImage,
        handleClickSwitchBurger,
        homeBannerEl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
