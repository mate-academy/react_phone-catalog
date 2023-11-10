import { useContext } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import './FavouritesPage.scss';
import { NoResults } from '../../components/NoResults';
import { FavContext } from '../../storage/FavContext';
import { ProductsList } from '../../components/ProductsList';

export const Favourites = () => {
  const { favProducts } = useContext(FavContext);

  return (
    <div className="favourites">
      <Breadcrumbs />

      {!favProducts.length && (
        <NoResults
          category="Favourites"
        />
      )}

      {favProducts.length > 0 && (
        <>
          <h1 className="favourites__title">
            Favourites
          </h1>

          <p className="favourites__text">
            {`${favProducts.length} items`}
          </p>

          <ProductsList
            products={favProducts}
          />
        </>
      )}
    </div>
  );
};
