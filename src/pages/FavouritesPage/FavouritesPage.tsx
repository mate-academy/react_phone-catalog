import { useContext } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import './FavouritesPage.scss';
import { ProductList } from '../../components/SliderList';
import { NoResults } from '../../components/NoResults';
import { FavContext } from '../../storage/FavContext';

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

          <ProductList
            products={favProducts}
          />
        </>
      )}
    </div>
  );
};
