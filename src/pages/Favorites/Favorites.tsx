import React from 'react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { ProductsList } from '../../components/ProductsList';
import { NotFound } from '../../components/NotFound';
import { CenteredContent } from '../../components/CenteredContent';
import { useFavorite } from '../../hooks/useFavorite';
import { useTranslate } from '../../hooks/useTranslate';
import { IMG_NOT_FOUND, TITLE_NOT_FOUND } from '../../constants/notFound';
import style from './Favorites.module.scss';

export const Favorites: React.FC = () => {
  const { favoriteProducts, totalFavoriteProducts } = useFavorite();
  const t = useTranslate();

  const hasFavorite = totalFavoriteProducts > 0;

  if (!hasFavorite) {
    return (
      <CenteredContent>
        <NotFound img={IMG_NOT_FOUND.product} text={TITLE_NOT_FOUND.favorite} />
      </CenteredContent>
    );
  }

  return (
    <>
      <div className="breadcrumbSection">
        <Breadcrumb />
      </div>

      <div className="pageSection">
        <h1 className="pageTitle">{t('categories.favorites')}</h1>
        <p className="itemsCount">
          {totalFavoriteProducts}{' '}
          {t('byCategory.models', { count: totalFavoriteProducts })}
        </p>

        <div className={style.favoriteProducts}>
          <ProductsList data={favoriteProducts} />
        </div>
      </div>
    </>
  );
};
