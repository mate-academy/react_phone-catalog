import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ProductsList } from '../../shared/ProductsList/ProductsList';
import styles from './Favorite.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { setModels } from '../../../features/pagesDetailsSlice';
import { useTranslation } from 'react-i18next';

export const Favorites: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { t } = useTranslation();

  const favGadgets = useAppSelector(state => state.chosenItems.favorite);
  const models = useAppSelector(state => state.pagesDetails.models);
  const isDark = useAppSelector(state => state.boolean.isDark);

  useEffect(() => {
    if (location.pathname === '/favorites') {
      dispatch(setModels(favGadgets.length));
    }
  }, [favGadgets, location, dispatch]);

  return (
    <div className={styles.gridContainer}>
      <div className={styles.favorites}>
        <div className={styles.favorites__path}>
          <Link className={styles.favorites__pathHomeLink} to="/">
            {isDark ? (
              <img src="./icons/dark-theme-icons/home-ico.svg" alt="home" />
            ) : (
              <img src="./icons/home-ico.svg" alt="home" />
            )}
          </Link>

          <img src="./icons/arrow-right-light-ico.svg" alt="arrow-right" />

          <p className={styles.favorites__pathCategory}>
            {t(`${location.pathname.slice(1)}`)}
          </p>
        </div>

        <h1 className={styles.favorites__title}> {t('favorites')} </h1>

        <p className={styles.favorites__quantity}>
          {`${models} ${models === 1 ? `${t('model')}` : `${t('models')}`}`}
        </p>

        {favGadgets.length === 0 && (
          <h3 className={styles.favorites__empty}>{t('empty_favorites')}</h3>
        )}

        <ProductsList gadgets={favGadgets} />
      </div>
    </div>
  );
};
