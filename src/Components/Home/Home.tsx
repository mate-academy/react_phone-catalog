import React, { useEffect, useState } from 'react';
import { useCart } from '../../Context/Context';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/header';
import { Main } from '../Main/Main';
import './Home.scss';
import { useFav } from '../../Context/FavouritesContext';
import { Aside } from '../Aside/Aside';

export const Home = () => {
  const { totalQuantity } = useCart();
  const { totalFavourites } = useFav();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  return (
    <div className={`page page__body ${menuOpen ? 'page__body-open' : ''}`}>
      <Header
        cartItemsCount={totalQuantity}
        favouritesCount={totalFavourites}
        setMenuOpen={setMenuOpen}
      />
      {menuOpen && (
        <Aside
          setMenuOpen={setMenuOpen}
          totalFavourites={totalFavourites}
          totalQuantity={totalQuantity}
        />
      )}
      <div className="container">
        <Main />
      </div>
      <Footer />
    </div>
  );
};
