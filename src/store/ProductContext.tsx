import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getProducts } from '../api/Products';
import { ProductGeneral } from '../types/ProductGeneral';
import { Product } from '../types/Product';

export enum SortingBy {
  Newest = 'Newest',
  Alphabetically = 'Alphabetically',
  Cheapest = 'Cheapest',
}

interface ProductContextState {
  phones: ProductGeneral[];
  tablets: ProductGeneral[];
  accessories: ProductGeneral[];
  loading: boolean;
  errorMessage: string;
  currentPage: number;
  itemsOnPage: string | number;
  sortBy: string;
  onSortBy: (value: string) => void;
  onPageChange: (page: number, lastNumberOfPage: number) => void;
  onSetItemsOnPage: (value: string) => void;
  selectedProduct: Product | null;
  onSelectedProduct: (value: Product | null) => void;
  selectedImg: string;
  onSelectedImg: (value: string) => void;
  menuOpened: boolean;
  onMenuOpened: (value: boolean) => void;
  isMobile: boolean;
  onIsMobile: (value: boolean) => void;
  inFavourites: ProductGeneral[] | [];
  addProductToFavourites: (value: ProductGeneral) => void;
  inCart: ProductGeneral[] | [];
  addProductToCart: (value: ProductGeneral) => void;
}

export const ProductContext = createContext<ProductContextState>({
  phones: [],
  tablets: [],
  accessories: [],
  loading: false,
  errorMessage: '',
  currentPage: 1,
  onPageChange: () => {},
  itemsOnPage: 'all',
  sortBy: SortingBy.Newest,
  onSortBy: () => {},
  onSetItemsOnPage: () => {},
  onSelectedProduct: () => {},
  selectedProduct: null,
  selectedImg: '',
  onSelectedImg: () => {},
  menuOpened: false,
  onMenuOpened: () => {},
  isMobile: false,
  onIsMobile: () => {},
  inFavourites: [],
  addProductToFavourites: () => {},
  inCart: [],
  addProductToCart: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [phones, setPhones] = useState<ProductGeneral[]>([]);
  const [tablets, setTablets] = useState<ProductGeneral[]>([]);
  const [accessories, setAccessories] = useState<ProductGeneral[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsOnPage, setItemsOnPage] = useState<string | number>('all');
  const [sortBy, setSortBy] = useState('Newest');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImg, setSelectedImg] = useState('');
  const [menuOpened, setMenuOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [inFavourites, setInFavourites] = useState<ProductGeneral[] | []>([]);
  const [inCart, setInCart] = useState<ProductGeneral[] | []>([]);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(result => {
        const phonesData = result.filter(phone => phone.category === 'phones');

        setPhones(phonesData);

        const tabletData = result.filter(
          tablet => tablet.category === 'tablets',
        );

        setTablets(tabletData);

        const accessoriesData = result.filter(
          acces => acces.category === 'accessories',
        );

        setAccessories(accessoriesData);
      })
      .catch(() => setErrorMessage("can't load the products."))
      .finally(() => setLoading(false));
  }, []);

  const addProductToCart = (value: ProductGeneral) => {
    const itemInCart = inCart.find(prod => prod === value);

    if (itemInCart) {
      const newItems = [...inCart, value];

      const newList = newItems.filter(item => item !== value);

      setInCart(newList);
    } else {
      const newItems = [...inFavourites, value];

      setInCart(newItems);
    }
  };

  const addProductToFavourites = (value: ProductGeneral) => {
    const itemInFav = inFavourites.find(prod => prod === value);

    if (itemInFav) {
      const newItems = [...inFavourites, value];

      const newList = newItems.filter(item => item !== value);

      setInFavourites(newList);
    } else {
      const newItems = [...inFavourites, value];

      setInFavourites(newItems);
    }
  };

  const onMenuOpened = (value: boolean) => {
    if (window.innerWidth > 640) {
      setMenuOpened(false);
    }

    setMenuOpened(value);
  };

  const onIsMobile = () => {
    setIsMobile(true);
  };

  const onSetItemsOnPage = (value: string | number) => {
    setCurrentPage(1);
    setItemsOnPage(value);
  };

  const onSortBy = (value: string) => {
    setSortBy(value);
  };

  const onSelectedImg = (value: string) => {
    setSelectedImg(value);
  };

  const onPageChange = useCallback(
    (page: number, lastNumberOfPage: number): void => {
      if (page === currentPage || page < 1 || page > lastNumberOfPage) {
        return;
      } else {
        setCurrentPage(page);
      }
    },
    [currentPage],
  );

  const onSelectedProduct = (value: Product | null) => {
    onSelectedImg('');
    setSelectedProduct(value);
  };

  const value = useMemo(
    () => ({
      // products,
      phones,
      tablets,
      accessories,
      loading,
      errorMessage,
      currentPage,
      onPageChange,
      itemsOnPage,
      onSetItemsOnPage,
      sortBy,
      onSortBy,
      onSelectedProduct,
      selectedProduct,
      selectedImg,
      onSelectedImg,
      onMenuOpened,
      menuOpened,
      onIsMobile,
      isMobile,
      inFavourites,
      addProductToFavourites,
      inCart,
      addProductToCart,
    }),
    [
      menuOpened,
      onMenuOpened,
      selectedProduct,
      phones,
      accessories,
      tablets,
      loading,
      errorMessage,
      currentPage,
      itemsOnPage,
      onPageChange,
      sortBy,
      selectedImg,
      isMobile,
      inFavourites,
      inCart,
    ],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
