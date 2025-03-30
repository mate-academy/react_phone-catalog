/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import { AnimatedLayout } from '../../shared/Shared_Components/AnimatedComponents/AnimatedLayout';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from '../../shared/Shared_Components/Breadcrumb/Breadcrumb';
import { NoResultCat } from '../../shared/Shared_Components/NoResultCat/NoResultCat';
import { FavouritesContext } from '../../../Store/FavouritesStore';
import { FavouritesList } from './FavouritesList';
import { scrollToTop } from '../../../utils/scrollToTop';

export const FavouritesPage: React.FC = () => {
  const { pathname } = useLocation();
  const pageName = pathname.replace('/', '');
  const { favourites } = useContext(FavouritesContext);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <AnimatedLayout>
      <div className="container">
        <Breadcrumb pathname={pathname} pageName={pageName} />

        <h1 className="title title--h1">Favourites</h1>

        {favourites?.length ? (
          <FavouritesList favourites={favourites} />
        ) : (
          <NoResultCat />
        )}
      </div>
    </AnimatedLayout>
  );
};
