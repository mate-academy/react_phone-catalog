import { useContext } from 'react';
import { FavList } from './components/FavList';
import favPageClass from './FavoritePage.module.scss';
import cn from 'classnames';
import { FavoritesContext } from '../../context/FavoritesContext';

export const FavoritePage = () => {
  const { favProducts } = useContext(FavoritesContext);
  const favLength = favProducts.length;

  return (
    <section className={cn(favPageClass['fav-page'], 'container')}>
      <div className={cn(favPageClass['fav-page__title-content'])}>
        <h1 className={cn(favPageClass['fav-page__title'])}>Favorites</h1>
        <p className={cn(favPageClass['fav-page__text'])}>{favLength} items</p>
      </div>
      {Boolean(favLength) && <FavList products={favProducts} />}
      {!Boolean(favLength) && (
        <div className={cn(favPageClass['fav-page__heart-broken'])}></div>
      )}
    </section>
  );
};
