import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { HomePage } from '../../Routes/HomePage/HomePage';
import { Footer } from '../Footer/Footer';
import { PhonesPage } from '../../Routes/PhonesPage/PhonesPage';
import { TabletsPage } from '../../Routes/TabletsPage/TabletsPage';
import { AccessoriesPage } from '../../Routes/AccessoriesPage/AccessoriesPage';
import { ProductDetailsPage } from '../../Routes/ProductDetailsPage/ProductDetailsPage';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="/tablets">
          <Route index element={<TabletsPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="/accessories">
          <Route index element={<AccessoriesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
