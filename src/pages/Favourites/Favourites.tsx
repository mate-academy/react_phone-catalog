import React, { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

import {
  ProductsPageContent,
} from '../../components/ProductsPageContent/ProductsPageContent';
import { pageData } from '../../data/pageData';
import { ShopContext } from '../../ShopContext';

const BREADCRUMBS_DATA = {
  category: {
    name: 'Favourites',
    url: 'favourites',
  },
};

export const Favourites: React.FC = () => {
  const { pathname } = useLocation();
  const { favourites } = useContext(ShopContext);

  const currentPage = pageData.find(page => page.link === pathname.slice(1));
  const isInFavourites = favourites.length > 0;

  return (
    <section className="favourites">
      {!isInFavourites && (
        <>
          <div className="favourites__breadcrumbs products-page__breadcrumbs">
            <Breadcrumbs data={BREADCRUMBS_DATA} />
          </div>
          <h1 className="favourites__title title products-page__title">
            Favourites
          </h1>
          <div className="favourites__empty empty">
            <div className="cart__empty empty__message">
              Your favourites list is empty. Please select items to fill it...
            </div>
            <Link className="cart__empty-link empty__link" to="../">
              Go to HomePage
            </Link>
          </div>

        </>
      )}
      {currentPage && isInFavourites
        && (<ProductsPageContent data={currentPage} products={favourites} />)}
    </section>
  );
};
