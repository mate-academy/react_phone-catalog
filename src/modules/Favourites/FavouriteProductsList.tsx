/* eslint-disable import/no-extraneous-dependencies */
import { Link } from 'react-router-dom';
import { useFavourites } from '../shared/context/FavouritesContext';
import { useProducts } from '../shared/context/ProductsContext';
import { ProductsList } from '../shared/ProductsList';
import style from './FavouriteProductsList.module.scss';
import { useTheme } from '../shared/context/ThemeContext';
import { useTranslation } from 'react-i18next';

export const FavouriteProductsList = () => {
  const { favourites } = useFavourites();
  const { products } = useProducts();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const favouriteProducts = products.filter(product =>
    favourites.includes(product.itemId),
  );

  return (
    <div className={style.favorites}>
      <div className={style.favorites__header}>
        <Link to="/">
          <img
            src={
              theme === 'light'
                ? 'icons/home.svg'
                : './icons/home-dark-theme.svg'
            }
            alt="Back home"
          />
        </Link>
        <img src="icons/arrow-right.svg" alt="Favorites" />
        <span className={style.favorites__name}>{t('favourites')}</span>
      </div>
      <h1 className={style.favorites__title}>{t('favourites')}</h1>
      <p className={style.favorites__quantity}>
        {`${favourites.length}`} {t('items')}
      </p>
      <ProductsList products={favouriteProducts} />
    </div>
  );
};
