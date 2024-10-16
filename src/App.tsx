import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './Components/HomePage/HomePage';
import { PhonesPage } from './Components/ProductPage/PhonesPage';
import { HashRouter as Router } from 'react-router-dom';
import { PhonesOffer } from './Components/ProductOffer/PhoneOffer';
import { OldPhoneOffer } from './Components/OldPhoneOffer/OldPhoneOffer';
import { TabletsPage } from './Components/ProductPage/TabletsPage';
import { AccessoriesPage } from './Components/ProductPage/AccessoriesPage';
import { TabletsOffer } from './Components/ProductOffer/TabletsOffer';
import { AccessoriesOffer } from './Components/ProductOffer/AccessoriesOffer';
import { Favourites } from './Components/Favourites/Favourites';
import { CartItems } from './Components/CartItems/CartItems';
import { PagesNotFound } from './Components/PagesNotFound/PagesNotFound';

export const App = () => (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="default" element={<h1>Product Catalog</h1>} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/phones/:itemId" element={<PhonesOffer />} />
        <Route path="/tablets/:itemId" element={<TabletsOffer />} />
        <Route path="/accessories/:itemId" element={<AccessoriesOffer />} />
        <Route path="/oldPhones/:oldItemId" element={<OldPhoneOffer />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/cart" element={<CartItems />} />
        <Route path="*" element={<PagesNotFound />} />
      </Routes>
    </Router>
  </div>
);
