import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import './FavouritesPage.scss';
import { useAppSelector } from '../../app/hooks';
import { ProductCard } from '../../components/ProductCard';

export const FavouritesPage = () => {
  const { phone, favourites, search } = useAppSelector(state => state.phones);
  const { pathname } = useLocation();

  const correctPath = pathname.slice(1);
  const normalizedPathname = correctPath[0].toUpperCase()
    + correctPath.slice(1);

  const productsToRender = useMemo(() => {
    return favourites
      .filter(item => item.name.toLowerCase()
        .includes(search.trim().toLowerCase()));
  }, [favourites, search]);

  if (favourites.length === 0) {
    return (
      <p>NO ITEMS</p>
    );
  }

  if (productsToRender.length === 0) {
    return (
      <p>NOT FOUND SEARCH</p>
    );
  }

  return (
    <div>
      {!search && (
        <div className="breadcrumb">
          <Link to="/">
            <div className="icon icon-home" />
          </Link>

          <div>
            <div className="icon icon-next-inactive" />
          </div>
          {phone ? (
            <>
              <Link to={pathname} className="breadcrumb__name--active">
                {normalizedPathname}
              </Link>

              <div>
                <div className="icon icon-next-inactive" />

                <p>{phone.name}</p>
              </div>
            </>
          ) : (
            <p className="breadcrumb__name--inactive">
              {normalizedPathname}
            </p>
          )}
        </div>
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
