import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { FavContext } from '../../components/FavContext/FavContext';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import './Favorites.scss';

export const Favorites = () => {
  const { favProducts } = useContext(FavContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  return (
    <section className="Favorites">
      {!query && <Breadcrumbs />}
      {favProducts.length > 0 && (
        <>
          {!query && (
            <>
              <h1 className="page__sectionTitle Favorites__title">
                Favourites
              </h1>
              <p className="Favorites__count">{`${favProducts.length} items`}</p>
            </>
          )}
          <ProductsList products={favProducts} />
        </>
      )}

      {favProducts.length === 0 && (
        <h2 className="page__notification">
          You don&apos;t have any favourite products yet
        </h2>
      )}
    </section>
  );
};
