import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from '../../context/AppContextProvider';
import { Product, ProductInCart } from '../../types/Product';
import { getProducts } from '../../api/fetchData';
import { useLocalStorage } from '../../helpers/hooks/useLocalStorage';
import ScrollToTop from '../../helpers/ScrollTop';
import { Header } from '../../components/Header/Header';
import { HomePage } from '../HomePage/HomePage';
import { CategoryPage } from '../CategoryPage/CategoryPage';
import { ItemPage } from '../ItemPage/ItemPage';
import { FavoritesPage } from '../FavoritesPage/FavoritesPage';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { Footer } from '../../components/Footer/Footer';
import { CartPage } from '../CartPage/CartPage';
import './page.scss';
import { PathnamesApp } from '../../types/Pathnames';

export const Page: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productsCounter, setProductsCounter] = useState({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [cart, setCart] = useLocalStorage('cart', []);
  const { pathname } = useLocation();

  const pathnameNormalized = pathname === '/' ? 'home' : pathname.substring(1);

  async function loadProducts() {
    setIsLoading(true);

    try {
      const productsFromServer = await getProducts();

      setProducts(productsFromServer);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setPhones(products.filter(item => item.category === 'phones'));
    setTablets(products.filter(item => item.category === 'tablets'));
    setAccessories(products.filter(item => item.category === 'accessories'));
  }, [products]);

  useEffect(() => {
    setProductsCounter({
      phones: phones.length,
      tablets: tablets.length,
      accessories: accessories.length,
    });
  }, [phones, tablets, accessories]);

  const isProductSelected = (
    productId: string, productsGroup: Product[] | ProductInCart[],
  ): boolean => {
    return Array.isArray(productsGroup)
      && productsGroup.some(product => product.itemId === productId);
  };

  const toggleToFavorites = (item: Product) => {
    if (item && isProductSelected(item.itemId, favorites)) {
      const newFavorites = favorites.filter(
        (product: Product) => product.itemId !== item.itemId,
      );

      setFavorites(newFavorites);
    } else {
      setFavorites([...favorites, item]);
    }
  };

  const toggleToCart = (item: Product | ProductInCart) => {
    const productWidthCount = { ...item, count: 1 };

    if (item && isProductSelected(productWidthCount.itemId, cart)) {
      const newCart = cart.filter(
        (product: Product) => product.itemId !== item.itemId,
      );

      setCart(newCart);
    } else {
      setCart([...cart, productWidthCount]);
    }
  };

  const updateCountInCart = (productId: string, newCount: number) => {
    const updatedCart = cart.map((item: ProductInCart) => {
      if (item.itemId === productId) {
        return { ...item, count: newCount };
      }

      return item;
    });

    setCart(updatedCart);
  };

  return (
    <AppProvider
      value={{
        favorites,
        cart,
        toggleToFavorites,
        toggleToCart,
        isProductSelected,
        updateCountInCart,
      }}
    >
      <div className="page">
        <ScrollToTop />
        <Header />
        <main className="page__main">
          <div
            className={`page__container page__container_${pathnameNormalized}`}
          >
            <Routes>
              <Route path={PathnamesApp.Home}>
                <Route
                  index
                  element={(
                    <HomePage
                      products={phones}
                      productsCounter={productsCounter}
                    />
                  )}
                />
                <Route path={PathnamesApp.Phones}>
                  <Route
                    index
                    element={(
                      <CategoryPage
                        products={phones}
                        isLoading={isLoading}
                      />
                    )}
                  />
                  <Route
                    path=":itemId"
                    element={<ItemPage products={products} />}
                  />
                </Route>
                <Route
                  path={PathnamesApp.Tablets}
                  element={(
                    <CategoryPage
                      products={tablets}
                      isLoading={isLoading}
                    />
                  )}
                />
                <Route
                  path={PathnamesApp.Accessories}
                  element={(
                    <CategoryPage
                      products={accessories}
                      isLoading={isLoading}
                    />
                  )}
                />
                <Route
                  path={PathnamesApp.Favorites}
                  element={<FavoritesPage />}
                />
                <Route path={PathnamesApp.Cart} element={<CartPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
};
