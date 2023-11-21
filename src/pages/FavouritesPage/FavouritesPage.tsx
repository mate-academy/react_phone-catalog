import { useContext } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import './FavouritesPage.scss';
import { FavContext } from '../../storage/FavContext';
import { ProductsList } from '../../components/ProductsList';
import { EmptyCart } from '../../components/EmptyCart';

export const Favourites = () => {
  const { favProducts } = useContext(FavContext);

  return (
    <div className="favourites">
      <Breadcrumbs />

      {!favProducts.length && (
        <EmptyCart />
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
