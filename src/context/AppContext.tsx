/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Category } from "../types/category";
import { Product } from "../types/product";
import { BannerImage } from "../types/bannerImage";
import useLocalStorage from "../hooks/useLocalStorage.hook";
import { SortType } from "../types/sortType";
import { ShoppingCart } from "../types/shoppingCart";

type Props = {
  children: ReactNode;
};

type AppContextProps = {
  accessoriesList: Product[];
  bannerImages: BannerImage[];
  categories: Category[];
  chosenBanner: number;
  colors: { [key: string]: string };
  favorite: Product[];
  isBurgerOpen: boolean;
  handleAddFavoriteItem: (item: Product) => void;
  handleChangeBannerImage: (callback: number) => void;
  handleChangeBurger: (arg: boolean) => void;
  handleAddProductShop: (item: Product) => void;
  handleRemoveProductShop: (id: number) => void;
  handleClickSwitchBurger: () => void;
  handleRemoveFavoriteItem: (itemId: number) => void;
  handleIncreaseQuantityShop: (
    id: number,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  handleDecreaseQuantityShop: (
    id: number,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  homeBannerEl: React.RefObject<HTMLElement>;
  phonesList: Product[];
  productsList: Product[];
  productColors: { [key: string]: string };
  selectItemPerPage: string[];
  selectSortBy: string[];
  shoppingCart: ShoppingCart[];
  sortList: (list: Product[], sortType: SortType) => Product[];
  tabletsList: Product[];
};

const AppContext = createContext({} as AppContextProps);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("Context must be used within an AppContextContainer");
  }

  return context;
};

const bannerImages: BannerImage[] = [
  {
    id: 0,
    src: "/react_phone-catalog/img/bannerHome/Banner-1.webp",
    color: "#000000",
    title: "Now available in our store!",
    paragraph: "Be the first!",
    to: "/phones/apple-iphone-14-128gb-midnight",
  },
  {
    id: 1,
    src: "/react_phone-catalog/img/bannerHome/Banner-2.webp",
    color: "#dbdbdb",
    title: "Best of the best",
    paragraph: "Make sure of this!",
    to: "/tablets/apple-ipad-air-4th-gen-256gb-silver",
  },
  {
    id: 2,
    src: "/react_phone-catalog/img/bannerHome/Banner-3.webp",
    color: "#c4c4c4",
    title: "Choose our own watch' style",
    paragraph: "In difference is power!",
    to: "/accessories",
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

const selectItemPerPage = ["4", "8", "16", "All"];

const selectSortBy = ["Newest", "Alphabet", "Cheaper", "Expensive"];

export const AppContextContainer = ({ children }: Props) => {
  const [chosenBanner, setChosenBanner] = useLocalStorage<number>(
    "bannerHome",
    0,
  );
  const homeBannerEl = useRef<HTMLElement>(null);
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);
  const [phonesList, setPhonesList] = useState<Product[]>([]);
  const [tabletsList, setTabletsList] = useState<Product[]>([]);
  const [accessoriesList, setAccessoriesList] = useState<Product[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [favorite, setFavorite] = useLocalStorage<Product[]>("Favorite", []);
  const [shoppingCart, setShoppingCart] = useLocalStorage<ShoppingCart[]>(
    "ShoppingCart",
    [],
  );

  const categories: Category[] = [
    {
      id: "mobile-phones",
      array: phonesList,
      name: "Mobile phones",
      img: "/react_phone-catalog/img/sectionNames/category-phones.png",
      backgroundColor: "#6d6474",
      to: "/phones",
    },
    {
      id: "tablets",
      array: tabletsList,
      name: "Tablets",
      img: "/react_phone-catalog/img/sectionNames/category-tablets.png",
      backgroundColor: "#dd8d92",
      to: "/tablets",
    },
    {
      id: "accessories",
      array: accessoriesList,
      name: "Accessories",
      img: "/react_phone-catalog/img/sectionNames/category-accessories.png",
      backgroundColor: "#973d5f",
      to: "/accessories",
    },
  ];

  const productColors = {
    black: "#000000",
    green: "#008000",
    yellow: "#FFFF00",
    white: "#FFFFFF",
    purple: "#800080",
    red: "#FF0000",
    spacegray: "#4A4A4A",
    midnightgreen: "#004953",
    gold: "#FFD700",
    silver: "#C0C0C0",
    rosegold: "#B76E79",
    coral: "#FF7F50",
    spaceblack: "#1C1C1C",
    blue: "#0000FF",
    pink: "#FFC0CB",
    graphite: "#383838",
    sierrablue: "#4682B4",
    skyblue: "#87CEEB",
    starlight: "#FCF6E4",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/react_phone-catalog/api/products.json");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: Product[] = await response.json();

        const spitedCategories = data.reduce(
          (
            acc: Record<Product["category"], Product[]>,
            currentProduct: Product,
          ) => {
            const key = currentProduct.category;

            acc[key] = acc[key]
              ? [...acc[key], currentProduct]
              : [currentProduct];
            return acc;
          },
          {},
        );

        setProductsList(data);
        setPhonesList(spitedCategories.phones);
        setTabletsList(spitedCategories.tablets);
        setAccessoriesList(spitedCategories.accessories);
      } catch (err) {
        console.error("Something went wrong", err);
      }
    };

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

  const sortList = (list: Product[], sortType: SortType) => {
    const sanitizedSortType = sortType.replace(/^['"]|['"]$/g, "");

    return [...list].sort((a, b) => {
      switch (sanitizedSortType) {
        case "Newest":
          return b.year - a.year;
        case "Alphabet":
          return a.name.localeCompare(b.name);
        case "Expensive":
          return b.fullPrice - a.fullPrice;
        case "Cheaper":
          return a.fullPrice - b.fullPrice;
        default:
          return 0;
      }
    });
  };

  const handleAddFavoriteItem = (item: Product) => {
    setFavorite((prev) => [...prev, item]);
  };

  const handleRemoveFavoriteItem = (itemId: number) => {
    setFavorite((prev) => prev.filter((el) => el.id !== itemId));
  };

  const handleAddProductShop = (item: Product) => {
    setShoppingCart((prev) => [
      ...prev,
      {
        id: item.id,
        itemId: item.itemId,
        category: item.category,
        img: item.image,
        name: item.name,
        price: item.price,
        quantity: 1,
      },
    ]);
  };

  const handleRemoveProductShop = (id: number) => {
    setShoppingCart((prev) => prev.filter((el) => el.id !== id));
  };

  const handleIncreaseQuantityShop = (
    id: number,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setShoppingCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: e.shiftKey ? item.quantity + 5 : item.quantity + 1,
          };
        }

        return item;
      }),
    );
  };

  const handleDecreaseQuantityShop = (
    id: number,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setShoppingCart((prev) =>
      prev.map((item) => {
        const itemPerClick = e.shiftKey ? 5 : 1;
        const itemAfterClick =
          item.quantity - itemPerClick <= 0 ? 1 : item.quantity - itemPerClick;

        if (item.id === id && item.quantity !== 1) {
          return { ...item, quantity: itemAfterClick };
        }

        return item;
      }),
    );
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
        handleAddFavoriteItem,
        handleChangeBannerImage,
        handleChangeBurger,
        handleClickSwitchBurger,
        handleRemoveFavoriteItem,
        handleAddProductShop,
        handleRemoveProductShop,
        handleDecreaseQuantityShop,
        handleIncreaseQuantityShop,
        homeBannerEl,
        phonesList,
        productsList,
        productColors,
        selectItemPerPage,
        selectSortBy,
        shoppingCart,
        sortList,
        tabletsList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
