import { useEffect, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import { fetchAllProducts } from './api/fetchClient';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { actions as productsActions } from './store/reducers/products';
import {
  getCategory,
  handleLocalStorage,
  transformToUpperCase,
} from './utils/helpers/helpers';
import { actions as viewportActions } from './store/reducers/viewport';
import { NavBar } from './modules/shared/NavBar';
import { HomePage } from './modules/Home';
import { NotFoundPage } from './modules/NotFound';
import { CartPage } from './modules/Cart';
import { Product } from './types/Product';
import { Footer } from './modules/shared/Footer';
import { ProductsGrid } from './modules/shared/ProductsGrid';
import { ProductDetailsPage } from './modules/ProductDetails';
import { Category } from './types/Category';

export const App = () => {
  const dispatch = useAppDispatch();
  const { products, favorites, cart } = useAppSelector(state => state.products);
  const categories: Category[] = ['phones', 'tablets', 'accessories'];

  /* responsiveness start */

  const setViewportWidth = (value: number) => {
    dispatch(viewportActions.setViewportWidth(value));
  };

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* responsiveness end */

  /* local storage start */

  const displayedFavorites = useMemo(() => {
    return handleLocalStorage('favorites');
  }, [favorites]);

  const displyedCartItems = useMemo(() => {
    return handleLocalStorage('cart');
  }, [cart]);

  /* local storage end */

  /* setter functions start */

  const setProducts = (items: Product[]) => {
    dispatch(productsActions.setProducts(items));
  };

  const setLoading = (value: boolean) => {
    dispatch(productsActions.setLoading(value));
  };

  const setFavorites = (items: Product[]) => {
    dispatch(productsActions.setFavorites(items));
  };

  const setCartItems = (items: Product[]) => {
    dispatch(productsActions.setCartItems(items));
  };

  useEffect(() => setFavorites(displayedFavorites), []);
  useEffect(() => setCartItems(displyedCartItems), []);

  /* setter functions end */

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const fetchedProducts = await fetchAllProducts();

      setProducts(fetchedProducts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!products?.length) {
      fetchProducts();
    }
  }, []);

  return (
    <div className="App">
      <header>
        <NavBar />
      </header>

      <main>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />

            <Route path="home" element={<Navigate to="/" />} />

            {categories.map(category => (
              <Route path={category} key={category}>
                <Route
                  index
                  element={
                    <ProductsGrid
                      products={getCategory(products, category)}
                      title={transformToUpperCase(category)}
                    />
                  }
                />

                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>
            ))}

            <Route
              path="favorites"
              element={
                <ProductsGrid
                  products={displayedFavorites}
                  title="Favorites"
                  isFavoritesPage
                />
              }
            />

            <Route path="cart" element={<CartPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};
