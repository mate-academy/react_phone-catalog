import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Card } from './components/Card/Card';
import { PhoneProvider } from './components/Context/contex';
import { Favourites } from './components/Favourites/Favourites';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import './components/Header/Header.scss';
import { HomePage } from './components/HomePage/HomePage';
import { Phone } from './components/Phone/Phone';
import { ProductDetails } from './components/ProductDetals/ProductDetals';
import { Tablets } from './components/Tablets/Tablets';
import { MenuBurger } from './components/MenuBurger/MenuBurger';
import { Accessories } from './components/Accessories/Accessories';

const App = () => (
  <PhoneProvider>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/menu" element={<MenuBurger />} />
        <Route path="/phones">
          <Route index element={<Phone />} />
          <Route path=":idPhone" element={<ProductDetails />} />
        </Route>
        <Route path="/tablets" element={<Tablets />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/cart" element={<Card />} />
        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        />
      </Routes>
      <Footer />
    </div>
  </PhoneProvider>
);

export default App;
