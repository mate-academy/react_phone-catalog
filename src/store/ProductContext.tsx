import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getProductsItems } from '../api/Products';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Product } from '../types/Product';
import { ProductGeneral } from '../types/ProductGeneral';

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
  onLoading: (value: boolean) => void;
  errorMessage: string;
  currentPage: number;
  sortBy: string;
  onSortBy: (value: string) => void;
  onPageChange: (page: number, lastNumberOfPage: number) => void;
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
  removeProductFromCart: (product: ProductGeneral) => void;
  updateProductQuantity: (product: ProductGeneral, quantity: number) => void;
}

export const ProductContext = createContext<ProductContextState>({
  phones: [],
  tablets: [],
  accessories: [],
  loading: false,
  onLoading: () => {},
  errorMessage: '',
  currentPage: 1,
  onPageChange: () => {},
  sortBy: SortingBy.Newest,
  onSortBy: () => {},
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
  removeProductFromCart: () => {},
  updateProductQuantity: () => {},
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
  const [sortBy, setSortBy] = useState('Newest');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImg, setSelectedImg] = useState('');
  const [menuOpened, setMenuOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [inFavourites, setInFavourites] = useLocalStorage<ProductGeneral[]>(
    'favorites',
    [],
  );
  const [inCart, setInCart] = useLocalStorage<ProductGeneral[]>('cart', []);

  useEffect(() => {
    setLoading(true);

    getProductsItems()
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

  const addProductToCart = useCallback(
    (value: ProductGeneral) => {
      setInCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === value.id);

        if (existingItem) {
          return prevCart.map(item =>
            item.id === value.id ? { ...item, quantity: 1 } : item,
          );
        } else {
          return [...prevCart, { ...value, quantity: 1 }];
        }
      });
    },
    [setInCart],
  );

  const onLoading = useCallback((value: boolean) => {
    setLoading(value);
  }, []);

  const addProductToFavourites = useCallback(
    (value: ProductGeneral) => {
      const itemInFav = inFavourites.find(prod => prod === value);

      if (itemInFav) {
        const newItems = [...inFavourites, value];
        const newList = newItems.filter(item => item !== value);

        setInFavourites(newList);
      } else {
        const newItems = [...inFavourites, value];

        setInFavourites(newItems);
      }
    },
    [inFavourites, setInFavourites],
  );

  const removeProductFromCart = useCallback(
    (product: ProductGeneral) => {
      setInCart(prevCart => prevCart.filter(item => item.id !== product.id));
    },
    [setInCart],
  );

  const updateProductQuantity = useCallback(
    (product: ProductGeneral, quantity: number) => {
      setInCart(prevCart =>
        prevCart.map(item =>
          item.id === product.id ? { ...item, quantity } : item,
        ),
      );
    },
    [setInCart],
  );

  const onMenuOpened = useCallback((value: boolean) => {
    if (window.innerWidth > 640) {
      setMenuOpened(false);
    }

    setMenuOpened(value);
  }, []);

  const onIsMobile = () => {
    setIsMobile(true);
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

  const onSelectedProduct = useCallback((value: Product | null) => {
    onSelectedImg('');
    setSelectedProduct(value);
  }, []);

  const value = useMemo(
    () => ({
      phones,
      tablets,
      accessories,
      loading,
      errorMessage,
      currentPage,
      onPageChange,
      sortBy,
      selectedProduct,
      selectedImg,
      menuOpened,
      isMobile,
      inFavourites,
      inCart,
      onSortBy,
      onSelectedImg,
      onMenuOpened,
      onIsMobile,
      addProductToFavourites,
      onSelectedProduct,
      addProductToCart,
      onLoading,
      removeProductFromCart,
      updateProductQuantity,
    }),
    [
      removeProductFromCart,
      updateProductQuantity,
      menuOpened,
      selectedProduct,
      phones,
      accessories,
      tablets,
      loading,
      errorMessage,
      currentPage,
      onPageChange,
      sortBy,
      selectedImg,
      isMobile,
      inFavourites,
      inCart,
      onMenuOpened,
      addProductToCart,
      addProductToFavourites,
      onSelectedProduct,
      onLoading,
    ],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
