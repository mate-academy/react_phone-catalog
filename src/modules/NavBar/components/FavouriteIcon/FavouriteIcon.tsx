import style from './FavouriteIcon.module.scss';
import { useSelector } from 'react-redux';
import { selectFavourites } from '../../../../state/favouriteSlice';
import favouritesIcon from '../../../../assets/FavouritesIcon.svg';

export const FavouriteIcon = () => {
  const favouriteProducts: [] = useSelector(selectFavourites);

  return (
    <div className={style.cartIcon}>
      <div className={style.iconWrapper}>
        <img className={style.icon} src={favouritesIcon} alt="Cart" />
        {favouriteProducts.length > 0 && (
          <span className={style.counter}>{favouriteProducts.length}</span>
        )}
      </div>
    </div>
  );
};
