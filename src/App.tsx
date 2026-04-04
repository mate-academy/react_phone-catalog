import './App.scss';
import Home from './pages/homePage/Home';
import Phones from './pages/phonesPage/Phones';
import Accessories from './pages/accessoriesPage/Accessories';
import Tablets from './pages/tabletsPage/Tablets';
import Heart from './pages/heartPage/Heart';
import ProductPage from './pages/productPage/ProductPage';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Basket from './pages/basketPage/Basket';

export const App = () => {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phones" element={<Phones />} />
          <Route path="/tablets" element={<Tablets />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/heart" element={<Heart />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/:category/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
};
