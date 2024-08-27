import { useContext } from 'react';
import { MenuOpen } from '../../utils/MenuContext';
import { Header } from '../Header/Header';
import './FavoritePage.scss';
import { Menu } from '../Menu/Menu';
import { Footer } from '../Footer/Footer';
import { Favorite } from '../../utils/FavoriteContext';
import { ProductCard } from '../ProductCard/ProductCard';
// import { Product } from '../../types/Propduct';
// import { ProductCard } from '../ProductCard/ProductCard';

export const FavoritePage = () => {
  const { isMenuOpen } = useContext(MenuOpen);

  const favoriteArr = useContext(Favorite);

  return (
    <>
      <Header />
      {isMenuOpen && <Menu />}
      {favoriteArr.map(item => (
        <ProductCard key={item.id} id={item.id} />
      ))}
      <Footer />
    </>
  );
};
