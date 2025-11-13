import { useEffect } from 'react';

//style
import './App.scss';

//react-router
import { Navigate, Route, Routes } from 'react-router-dom';

//components
import { Navbar } from './components/Navbar';

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
      <Navbar />

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
