import { useContext } from 'react';
import { MenuOpen } from '../../utils/MenuContext';
import { Header } from '../Header/Header';
import './FavoritePage.scss';
import { Menu } from '../Menu/Menu';
import { Footer } from '../Footer/Footer';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Propduct';

export const FavoritePage = () => {
  const { isMenuOpen } = useContext(MenuOpen);
  const favorites: Product[] =
    JSON.parse(localStorage.getItem('favoriteArr') ?? '') || [];

  return (
    <>
      <Header />
      {isMenuOpen && <Menu />}
      {favorites.length ? (
        <div className="favorite-box">
          {favorites.map(item => (
            <ProductCard key={item.id} id={item.id} />
          ))}
        </div>
      ) : (
        <h1 className="no-favorite">No favorites yet</h1>
      )}
      <Footer />
    </>
  );
};
