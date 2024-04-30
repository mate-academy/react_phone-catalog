import React from 'react';
import { PathBlock } from '../utils/Path';
import './FavouritesPage.scss';
import { useDeviceContext } from '../DeviceContext/DeviceContext';
import { ProductListFavourites } from '../ProductsPages/ProductList';
import { useTranslation } from 'react-i18next';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useDeviceContext();
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="FavouritesPage">
        <PathBlock category="favourites" />
        <h1 className="FavouritesPage__title">{t('Favourites')}</h1>
        {!favourites.length && (
          <h2 style={{ marginTop: '32px' }}>{t('Favourites empty')}</h2>
        )}
        {!!favourites.length && (
          <>
            <p className="FavouritesPage__items body-text">
              {t('p.items-length', { length: favourites.length })}
            </p>
            <div className="ProductsPage__cards">
              <ProductListFavourites favourites={favourites} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
