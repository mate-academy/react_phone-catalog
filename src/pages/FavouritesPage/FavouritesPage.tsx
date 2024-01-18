import { useMemo } from 'react';
import './FavouritesPage.scss';
import { useAppSelector } from '../../app/hooks';
import { ProductCard } from '../../components/ProductCard';
import { Empty } from '../../components/Empty';
import { NoProductsFound } from '../../components/NoProductsFound';
import { Breadcrumb } from '../../components/Breadcrumb';
import { favouritesPageImage } from '../../helpers/constants';

export const FavouritesPage = () => {
  const { favourites, search } = useAppSelector(state => state.phones);

  const productsToRender = useMemo(() => {
    return favourites
      .filter(item => item.name.toLowerCase()
        .includes(search.trim().toLowerCase()));
  }, [favourites, search]);

  if (favourites.length === 0) {
    return (
      <Empty
        title="Products you add to favourites will appear here"
        buttnText="Explore products"
        img={favouritesPageImage}
      />
    );
  }

  if (productsToRender.length === 0) {
    return (
      <NoProductsFound />
    );
  }

  return (
    <div>
      {!search && (
        <Breadcrumb />
      )}

      <div className="favourites">
        {search ? (
          <p className="favourites__text favourites__text--found">
            {`${productsToRender.length} results`}
          </p>
        ) : (
          <div className="favourites__top">
            <h1 className="favourites__title title">
              Favourites
            </h1>
            <p className="favourites__text">
              {`${favourites.length} items`}
            </p>
          </div>
        )}

        <div className="favourites__content">
          {productsToRender
            .map(item => <ProductCard product={item} key={item.id} />)}
        </div>
      </div>
    </div>
  );
};
