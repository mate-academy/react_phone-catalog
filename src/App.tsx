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

export const App = () => {
  const [phones, setPhones] = useState([]);
  const [tablets, setTablets] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch('../../../api/phones.json')
      .then(res => res.json())
      .then(data => setPhones(data));

    fetch('../../../api/tablets.json')
      .then(res => res.json())
      .then(data => setTablets(data));

    fetch('../../../api/accessories.json')
      .then(res => res.json())
      .then(data => setAccessories(data));
  }, []);

  return (
    <div className="App">
      <Header setMenuOpen={setMenuOpen} />
      <BurgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="page">
        <Routes>
          <Route path="/" element={<HomePage devices={phones} />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/phones" element={<Catalog devices={phones} />} />
          <Route path="/tablets" element={<Catalog devices={tablets} />} />
          <Route
            path="/accessories"
            element={<Catalog devices={accessories} />}
          />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
