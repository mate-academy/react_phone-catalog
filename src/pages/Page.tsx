/* eslint-disable object-curly-newline */
import { FC, useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from './Footer';
import { HomePage } from './HomePage';
import { Phones } from './Phones';
import { Tablets } from './Tablets';
import { Accessories } from './Accessories';
import { Cart } from './Cart';
import { Favourites } from './Favourites';
import { useLocaleStorage } from '../hooks/useLocaleStorage';
import { AppProvider } from '../context/AppContext';
import { ProductInCart } from '../types/ProductInCart';
import { ProductDetails } from './ProductDetails';
import { Product } from '../types/Product';
import { getProducts } from '../api/fetchData';

export const Page: FC = () => {
  const { pathname } = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favorites, setFavorites] = useLocaleStorage('favorites', []);
  const favCount = favorites.length;
  const [inCart, setInCart] = useLocaleStorage('inCart', []);
  const inCartCount = inCart.length;

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const isShowResSearch = query.trim().length !== 0;
  let productsToSearch = [...products];

  const isSelectedProduct = (
    itemId: string,
    poducts: Product[] | ProductInCart[],
  ): boolean => {
    return !!poducts.find((el: Product) => el.itemId === itemId);
  };

  const loadProducts = async () => {
    setIsLoading(true);

    try {
      const productsFromServer = await getProducts();

      setProducts(productsFromServer);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleToggleLike = (product: Product) => {
    if (isSelectedProduct(product.itemId, favorites)) {
      const newFavorites = favorites.filter(
        (fav: Product) => fav.itemId !== product.itemId,
      );

      setFavorites(newFavorites);
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const handleToggleAddToCart = (product: Product | ProductInCart) => {
    const productWidthCount = { ...product, count: 1 };

    if (isSelectedProduct(productWidthCount.itemId, inCart)) {
      const newInCart = inCart.filter(
        (cart: Product) => cart.itemId !== product.itemId,
      );

      setInCart(newInCart);
    } else {
      setInCart([...inCart, productWidthCount]);
    }
  };

  if (query.trim() && pathname === '/favourites' && favorites.length !== 0) {
    productsToSearch = [...favorites];
    productsToSearch = productsToSearch.filter((product: Product) => {
      return product.name.toLowerCase().includes(query.trim().toLowerCase());
    });
  } else if (query.trim()) {
    productsToSearch = productsToSearch.filter((product: Product) => {
      return product.name.toLowerCase().includes(query.trim().toLowerCase());
    });
  }

  const updateCount = (newCount: number, itemId: string) => {
    const newInCart = inCart.map((el: ProductInCart) => {
      if (el.itemId === itemId) {
        return { ...el, count: newCount };
      }

      return el;
    });

    setInCart(newInCart);
  };

  const phones: Product[] = products;
  const tablets: Product[] = [];
  const accessories: Product[] = [];
  const countProducts = {
    phones: phones.length,
    tablets: tablets.length,
    accessories: accessories.length,
  };

  return (
    <AppProvider
      value={{
        favorites,
        favCount,
        handleToggleLike,
        inCart,
        inCartCount,
        handleToggleAddToCart,
        isSelectedProduct,
        query,
        isShowResSearch,
        productsToSearch,
        updateCount,
      }}
    >
      <div className="page">
        <Header />
        <div className="page__content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage products={products} countProducts={countProducts} />
              }
            />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/phones">
              <Route
                index
                element={<Phones products={phones} isLoading={isLoading} />}
              />
              <Route path=":productId" element={<ProductDetails />} />
            </Route>

            <Route
              path="/tablets"
              element={<Tablets products={tablets} isLoading={isLoading} />}
            />
            <Route
              path="/accessories"
              element={
                <Accessories products={accessories} isLoading={isLoading} />
              }
            />
            <Route path="/cart" element={<Cart products={inCart} />} />

            <Route
              path="/favourites"
              element={<Favourites products={favorites} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </AppProvider>
  );
};
