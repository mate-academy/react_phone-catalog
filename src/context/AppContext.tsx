/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Image } from "../types/image";
import { Item } from "../types/item";
import { Category } from "../types/category";
import { Product } from "../types/product";

type Props = {
  children: ReactNode;
};

type AppContextProps = {
  accessoriesList: Item[];
  bannerImages: Image[];
  categories: Category[];
  chosenBanner: number;
  colors: { [key: string]: string };
  favorite: number;
  isBurgerOpen: boolean;
  handleChangeBannerImage: (callback: number) => void;
  handleChangeBurger: (arg: boolean) => void;
  handleClickSwitchBurger: () => void;
  homeBannerEl: React.RefObject<HTMLElement>;
  phonesList: Item[];
  productsList: Product[];
  tabletsList: Item[];
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
  const [phonesList, setPhonesList] = useState<Item[]>([]);
  const [tabletsList, setTabletsList] = useState<Item[]>([]);
  const [accessoriesList, setAccessoriesList] = useState<Item[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [favorite] = useState<number>(0);

  const categories: Category[] = [
    {
      id: "mobile-phones",
      array: phonesList,
      name: "Mobile phones",
      img: "/react_phone-catalog/public/img/category-phones.png",
      backgroundColor: "#6d6474",
      to: "/phones",
    },
    {
      id: "tablets",
      array: tabletsList,
      name: "Tablets",
      img: "/react_phone-catalog/public/img/category-tablets.png",
      backgroundColor: "#dd8d92",
      to: "/tablets",
    },
    {
      id: "accessories",
      array: accessoriesList,
      name: "Accessories",
      img: "/react_phone-catalog/public/img/category-accessories.png",
      backgroundColor: "#973d5f",
      to: "/accessories",
    },
  ];

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch(
          "/react_phone-catalog/src/assets/api/phones.json",
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPhonesList(data);
      } catch (err) {
        console.error("Something went wrong", err);
      }
    };

    const fetchTablets = async () => {
      try {
        const response = await fetch(
          "/react_phone-catalog/src/assets/api/tablets.json",
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTabletsList(data);
      } catch (err) {
        console.error("Something went wrong", err);
      }
    };

    const fetchAccessories = async () => {
      try {
        const response = await fetch(
          "/react_phone-catalog/src/assets/api/accessories.json",
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAccessoriesList(data);
      } catch (err) {
        console.error("Something went wrong", err);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "/react_phone-catalog/src/assets/api/products.json",
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProductsList(data);
      } catch (err) {
        console.error("Something went wrong", err);
      }
    };

    fetchPhones();
    fetchTablets();
    fetchAccessories();
    fetchProducts();
  }, []);

  const handleChangeBannerImage = (callback: number) => {
    setChosenBanner(callback);
  };

  const handleChangeBurger = (arg: boolean) => {
    setIsBurgerOpen(arg);
  };

  const handleClickSwitchBurger = () => {
    setIsBurgerOpen((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        accessoriesList,
        bannerImages,
        categories,
        colors,
        chosenBanner,
        favorite,
        isBurgerOpen,
        handleChangeBannerImage,
        handleChangeBurger,
        handleClickSwitchBurger,
        homeBannerEl,
        phonesList,
        productsList,
        tabletsList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
