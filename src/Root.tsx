import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import {
  DispatchContext,
  GlobalStateProvider,
  StatesContext,
} from './store/GlobalStateProvider';
import { HomePage } from './pages/Home/Home.page';
import { App } from './App';
import { CatalogPage } from './pages/Catalog/Catalog.page';
import { NotFound } from './pages/NotFound/NotFound.page';
import { useContext, useEffect } from 'react';
import { getProducts, getCategories } from './api/products';
import { ProductSummary } from './types/ProductSummary';

export const Root = () => {
  const dispatch = useContext(DispatchContext);
  const { products } = useContext(StatesContext);

  useEffect(() => {
    dispatch({ type: 'isLoading', payload: true });
    getProducts<ProductSummary[]>('http://localhost:3000/api/products.json')
      .then(productsFromServer => {
        dispatch({ type: 'loadProducts', payload: productsFromServer });
      })
      .finally(() => dispatch({ type: 'isLoading', payload: false }));
  }, []);

  useEffect(() => {
    getCategories(products).then(categories => {
      dispatch({ type: 'loadCategories', payload: categories });
    });
  });

  return (
    <Router>
      <GlobalStateProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/:category?" element={<CatalogPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </GlobalStateProvider>
    </Router>
  );
};
