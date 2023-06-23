import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import './App.scss';
import { HomePage } from '../../Routes/HomePage/HomePage';
import { Footer } from '../Footer/Footer';
import { PhonesPage } from '../../Routes/PhonesPage/PhonesPage';
import { TabletsPage } from '../../Routes/TabletsPage/TabletsPage';
import { AccessoriesPage } from '../../Routes/AccessoriesPage/AccessoriesPage';
import { ProductDetailsPage } from '../ProductDetailsPage/ProductDetailsPage';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home', { replace: true });
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
