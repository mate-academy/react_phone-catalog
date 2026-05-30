import { Footer } from '../HomePage/components/Footer';
import { Header } from '../HomePage/components/Header';
import { FavouriteProductsList } from './FavouriteProductsList';
import style from './Favorites.module.scss';

export const Favorites = () => {
  return (
    <>
      <Header />
      <div className={style.container}>
        <FavouriteProductsList />
        <Footer />
      </div>
    </>
  );
};
