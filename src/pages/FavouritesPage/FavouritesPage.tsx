import React, { useContext } from 'react';

import { GeneralContext } from '../../helpers/GeneralContext';
import { ProductsPageContent } from '../../components/ProductsPageContent';

export const FavoritesPage: React.FC = () => {
  const { favouritesList } = useContext(GeneralContext);

  return (
    <div className="favouritesPage">
      <section className="phonesPage">
        <ProductsPageContent
          type="Favourites"
          title="Favourites"
          itemsList={favouritesList}
        />
      </section>
    </div>
  );
};
