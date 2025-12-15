//hooks
import { useEffect } from 'react';

//react-router
import { Navigate, Route, Routes } from 'react-router-dom';

//style
import './styles/Reset.scss';
import styles from './App.module.scss';

//components
import { NavBar } from './components/NavBar';

//pages
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductsPage } from './pages/ProductsPage';

export const App = () => {
  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + '#/');
    }
  }, []);

  return (
    <div className={styles.app}>
      <NavBar />

      <Routes>
        <Route path="/home" element={<Navigate to="/" replace={true} />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/phones">
          <Route index element={<ProductsPage productsType={'phones'} />} />
        </Route>
        <Route path="/tablets">
          <Route index element={<ProductsPage productsType={'tablets'} />} />
        </Route>
        <Route path="/accessories">
          <Route
            index
            element={<ProductsPage productsType={'accessories'} />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
