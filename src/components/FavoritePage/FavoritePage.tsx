import { useContext } from 'react';
import { MenuOpen } from '../../utils/MenuContext';
import { Header } from '../Header/Header';
import './FavoritePage.scss';
import { Menu } from '../Menu/Menu';
import { Footer } from '../Footer/Footer';
import { ProductCard } from '../ProductCard/ProductCard';
import { useFavorites } from '../../utils/Favorites';
import { Link } from 'react-router-dom';

export const FavoritePage = () => {
  const { isMenuOpen } = useContext(MenuOpen);
  const favorites = useFavorites(state => state.favorites);

  return (
    <>
      <Header />
      {isMenuOpen && <Menu />}
      <main className="favorites__main">
        <div className="navigation">
          <Link to="/" className="navigation__home" />
          <img src=".\img\arrow-next-disabled.svg" alt="next page" />
          <p className="navigation__current-page">Favorites</p>
        </div>
        <h1 className="favorites__title">Favorites</h1>
        <p className="favorites__length">{favorites.length} items</p>
        {favorites.length ? (
          <div className="favorites__box">
            {favorites.map(item => (
              <ProductCard key={item.id} id={item.id} />
            ))}
          </div>
        ) : (
          <h1 className="no-favorite">No favorites yet</h1>
        )}
      </main>
      <Footer />
    </>
  );
};
