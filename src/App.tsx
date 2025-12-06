import { useEffect } from 'react';

//style
import './styles/Reset.scss';
import './App.module.scss';

//react-router
import { Navigate, Route, Routes } from 'react-router-dom';

//components
import { Header } from './components/Header';

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
    <div className="App">
      <Header />

      <Routes>
        <Route path="/home" element={<Navigate to="/" replace={true} />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products">
          <Route index element={<ProductsPage />} />
          <Route path=":productType" element={<ProductsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
