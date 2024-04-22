import { useCallback, useEffect, useMemo } from 'react';
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
import { Category } from './types/Category';
import { Product } from './types/Product';
import { Footer } from './components/Footer';
import { NavBar } from './components/Navbar';

import { CartPage } from './pages/CartPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/PageNotFound';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ProductsGrid } from './components/ProductsGrid';

export const App = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.products);
  const categories: Category[] = ['phones', 'tablets', 'accessories'];

  /* responsiveness start */

  const setViewportWidth = useCallback(
    (value: number) => {
      dispatch(viewportActions.setViewportWidth(value));
    },
    [dispatch],
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setViewportWidth]);

  /* responsiveness end */

  /* local storage start */

  const displayedFavorites = useMemo(() => {
    return handleLocalStorage('favorites');
  }, []);

  const displyedCartItems = useMemo(() => {
    return handleLocalStorage('cart');
  }, []);

  /* local storage end */

  /* setter functions start */

  const setProducts = useCallback(
    (items: Product[]) => {
      dispatch(productsActions.setProducts(items));
    },
    [dispatch],
  ); // Dependency on dispatch

  const setLoading = useCallback(
    (value: boolean) => {
      dispatch(productsActions.setLoading(value));
    },
    [dispatch],
  );

  const setFavorites = useCallback(
    (items: Product[]) => {
      dispatch(productsActions.setFavorites(items));
    },
    [dispatch],
  );

  const setCartItems = useCallback(
    (items: Product[]) => {
      dispatch(productsActions.setCartItems(items));
    },
    [dispatch],
  );

  useEffect(
    () => setFavorites(displayedFavorites),
    [displayedFavorites, setFavorites],
  );

  useEffect(
    () => setCartItems(displyedCartItems),
    [displyedCartItems, setCartItems],
  );

  /* setter functions end */

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    try {
      const fetchedProducts = await fetchAllProducts();

      setProducts(fetchedProducts);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setProducts]);

  useEffect(() => {
    if (!products?.length) {
      fetchProducts();
    }
  }, [fetchProducts, products?.length]);

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
