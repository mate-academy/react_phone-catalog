import { useLocation } from 'react-router-dom';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { useContext } from 'react';
import { FavouritesContext } from '../../FavouritesContext';
import { CardList } from '../shared/CardList/CardList';
import { capitalizeFirstLetter } from '../../utils/string';
import s from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { pathname } = useLocation();
  const { favourites } = useContext(FavouritesContext);
  const type = pathname.slice(1);

  return (
    <div className={s.favourites}>
      <Breadcrumbs type={type} />
      <h1 className={s.favourites__title}>{capitalizeFirstLetter(type)}</h1>
      <div className={s.favourites__amount}>
        {favourites.length === 1 ? `1 item` : `${favourites.length} items`}
      </div>
      <div className={s.favourites__list}>
        <CardList products={favourites} />
      </div>
    </div>
  );
};
