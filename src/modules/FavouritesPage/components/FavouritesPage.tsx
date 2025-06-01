/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import { AnimatedLayout } from '../../shared/Shared_Components/AnimatedComponents/AnimatedLayout';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from '../../shared/Shared_Components/Breadcrumb/Breadcrumb';
import { NoResultCat } from '../../shared/Shared_Components/NoResultCat/NoResultCat';
import { FavouritesContext } from '../../../Store/FavouritesStore';
import { FavouritesList } from './FavouritesList';
import { scrollToTop } from '../../../utils/scrollToTop';
import { DarkModeContext } from '../../../Store/StoreThemeMode';
import classNames from 'classnames';

export const FavouritesPage: React.FC = () => {
  const { pathname } = useLocation();
  const pages = pathname.split('/').slice(1);
  const { favourites } = useContext(FavouritesContext);
  const { isDark } = useContext(DarkModeContext);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <AnimatedLayout>
      <div className="container">
        <Breadcrumb arrayOfPages={pages} />

        <h1
          className={classNames('title title--h1', {
            'title--is-Dark': isDark,
          })}
        >
          Favourites
        </h1>

        {favourites?.length ? (
          <FavouritesList favourites={favourites} />
        ) : (
          <NoResultCat />
        )}
      </div>
    </AnimatedLayout>
  );
};
