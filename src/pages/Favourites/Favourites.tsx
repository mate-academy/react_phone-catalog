import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useAppSelector } from '../../api/hooks';
import { ProductCard } from '../../components/ProductCard';
import { productsFiltering } from '../../helpers/productsFiltering';

import './Favourites.scss';

const Favourites: React.FC = () => {
  const favouritesList = useAppSelector(state => state.favourites.favourites);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const favouritesListToShow = useMemo(() => {
    return productsFiltering.filterQuery(favouritesList, query);
  }, [favouritesList, query]);

  return (
    <div className="favourites">
      <Breadcrumbs items={{
        favourites: '/favourites',
      }}
      />

      <h1 className="favourites__title">Favourites</h1>

      <p className="favourites__quantity">
        {`${favouritesList.length} items`}
      </p>

      {favouritesList.length > 0 ? (
        <section className="product__list">
          {favouritesListToShow.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <section className="product__list">
          <h1 className="favourites__empty">
            Your favourites list is empty.
          </h1>
        </section>
      )}

    </div>
  );
};

export default Favourites;
