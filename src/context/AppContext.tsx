import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import {
  findProduct,
  getBannerSlides,
  getProduct,
  getProducts,
  getProductsForHomePage,
  getRandomProducts,
} from '../utils/ts/api';
import { BannerSlidesType } from '../types/BannerSlidesType';
import { ProductType } from '../types/ProductType';
import { ProductTypeExt } from '../types/ProductTypeExt';
import { CartType } from '../types/CartType';
import { CategoriesType } from '../types/CategoriesType';
import { ItemsOnPageType } from '../types/ItemsOnPageType';
import { SortBy } from '../types/SortBy';

export interface AppContextProps {
  bannerSlides: BannerSlidesType[];
  newModels: ProductType[];
  hotPrices: ProductType[];
  products: ProductType[];
  randomProducts: ProductType[];
  activeLink: string;
  activeProduct: ProductTypeExt | null;
  favourites: ProductType[];
  cart: CartType[];
  perPage: ItemsOnPageType;
  currentPage: number;
  sortBy: SortBy;
  isLoading: boolean;
  error: Error | null;
  handleSetProducts: (category: CategoriesType) => void;
  handleActiveProduct: (product: string | null) => void;
  handleFavourites: (product: ProductType) => void;
  handleCart: (product: ProductType) => void;
  handleSetError: (errorFromServer: Error) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, change: number) => void;
  handleRandomProducts: () => void;
  handleSetPerPage: (num: ItemsOnPageType) => void;
  handleSetCurrentPage: (page: number) => void;
  handleSetSortBy: (sort: SortBy) => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [bannerSlides, setBannerSlides] = useState<BannerSlidesType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [activeProduct, setActiveProduct] = useState<ProductTypeExt | null>(
    null,
  );
  const activeLink = useLocation().pathname;

  const [favourites, setFavourites] = useState<ProductType[]>([]);
  const [cart, setCart] = useState<CartType[] | []>([]);

  const [newModels, setNewModels] = useState<ProductType[]>([]);
  const [hotPrices, setHotPrices] = useState<ProductType[]>([]);
  const [randomProducts, setRandomProducts] = useState<ProductType[]>([]);

  const [perPage, setPerPage] = useState<ItemsOnPageType>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.NEWEST);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);

    // document.title = 'Nice Gadgets';

    getBannerSlides()
      .then(slides => setBannerSlides(slides))
      .catch(errorFromServer => {
        setError(errorFromServer);
      });

    getProductsForHomePage()
      .then(({ newModelsFromServer, hotPricesFromServer }) => {
        setNewModels(newModelsFromServer);
        setHotPrices(hotPricesFromServer);
      })
      .catch(errorFromServer => {
        setError(errorFromServer);
      })
      .finally(() => setIsLoading(false));

    const storedCart = window.localStorage.getItem('cart');

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    const storedFavourites = window.localStorage.getItem('favourites');

    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    const sortByParam = searchParams.get('sortBy') as SortBy;
    const perPageParam = searchParams.get('perPage') as ItemsOnPageType;
    const pageParam = Number(searchParams.get('page')) || 1;

    setSortBy(sortByParam || SortBy.NEWEST);
    setPerPage(perPageParam || 'all');
    setCurrentPage(pageParam);
  }, [searchParams]);

  const handleSetProducts = useCallback((category: CategoriesType) => {
    setIsLoading(true);

    getProducts(category)
      .then(phonesFromServer => setProducts(phonesFromServer))
      .catch(errorFromServer => {
        setError(errorFromServer);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleActiveProduct = useCallback(async (productId: string | null) => {
    setIsLoading(true);

    try {
      if (productId === null) {
        setActiveProduct(null);
      } else {
        const target = await findProduct(productId);

        if (target) {
          const product = await getProduct(
            target.category as CategoriesType,
            productId,
          );

          setActiveProduct(product);

          const phonesFromServer = await getProducts(
            target.category as CategoriesType,
          );

          setProducts(phonesFromServer);
        } else {
          setActiveProduct(null);
        }
      }
    } catch (errorFromServer) {
      setError(errorFromServer as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleFavourites = (product: ProductType) => {
    setFavourites(prev =>
      prev.some(item => item.itemId === product.itemId)
        ? prev.filter(item => item.itemId !== product.itemId)
        : [...prev, product],
    );
  };

  const handleCart = (product: ProductType) => {
    setCart(prev =>
      prev.some(item => item.product.itemId === product.itemId)
        ? prev.filter(item => item.product.itemId !== product.itemId)
        : [...prev, { product, quantity: 1 }],
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = async (productId: string, change: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.itemId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );
  };

  const handleRandomProducts = useCallback(() => {
    getRandomProducts()
      .then(productsFromServer => setRandomProducts(productsFromServer))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSetPerPage = (num: ItemsOnPageType) => {
    setPerPage(num);

    if (num !== 'all') {
      searchParams.set('perPage', num);
    } else {
      searchParams.delete('perPage');
    }

    setSearchParams(searchParams);
  };

  const handleSetCurrentPage = (page: number) => {
    setCurrentPage(page);

    if (page !== 1) {
      searchParams.set('page', `${page}`);
    } else {
      searchParams.delete('page');
    }

    setSearchParams(searchParams);
  };

  const handleSetError = (errorFromServer: Error) => {
    setError(errorFromServer);
  };

  const handleSetSortBy = (sort: SortBy) => {
    setSortBy(sort);

    if (sort !== SortBy.NEWEST) {
      searchParams.set('sortBy', sort);
    } else {
      searchParams.delete('sortBy');
    }

    setSearchParams(searchParams);
  };

  return (
    <AppContext.Provider
      value={{
        bannerSlides,
        newModels,
        hotPrices,
        products: products,
        randomProducts,
        activeLink,
        activeProduct,
        favourites,
        cart,
        perPage,
        currentPage,
        sortBy,
        isLoading,
        error,
        handleSetProducts,
        handleActiveProduct,
        handleFavourites,
        updateQuantity,
        handleCart,
        handleSetError,
        clearCart,
        handleRandomProducts,
        handleSetPerPage,
        handleSetCurrentPage,
        handleSetSortBy,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
