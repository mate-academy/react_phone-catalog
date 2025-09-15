import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { Basket } from './components/Basket/Basket';
import { Favourites } from './components/Favourites/Favourites';
import { Catalog } from './components/Catalog/Catalog';
import { BurgerMenu } from './components/BurgerMenu/BurgerMenu';
import { useState, useEffect } from 'react';
import { Product } from './types/Product';
import { ProductPage } from './components/ProductPage/ProductPage';
import { NotFound } from './components/NotFound/NotFound';

export const App = () => {
  const [phones, setPhones] = useState([]);
  const [tablets, setTablets] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then(data => {
        setPhones(
          data.filter((product: Product) => product.category === 'phones'),
        );
        setTablets(
          data.filter((product: Product) => product.category === 'tablets'),
        );
        setAccessories(
          data.filter((product: Product) => product.category === 'accessories'),
        );
      });
  }, []);

  return (
    <div className="App">
      <Header setMenuOpen={setMenuOpen} />
      <BurgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="page">
        <Routes>
          <Route path="/" element={<HomePage products={phones} />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route
            path="/phones"
            element={<Catalog products={phones} title="Phones" />}
          />
          <Route
            path="/tablets"
            element={<Catalog products={tablets} title="Tablets" />}
          />
          <Route
            path="/accessories"
            element={<Catalog products={accessories} title="Accessories" />}
          />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
