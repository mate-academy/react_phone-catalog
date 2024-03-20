import { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import './FavouritesPage.scss';
import { Empty } from '../../components/Empty';
import { favouritesPageImage } from '../../helpers/constants';
import { NoResults } from '../../components/NoResults';
import { Breadcrumb } from '../../components/Breadcrumb';
import { ProductCard } from '../../components/ProductCard';

export const FavouritesPage = () => {
  const { favourites, search } = useAppSelector(state => state.phones);

  const productsToRender = useMemo(() => {
    return favourites.filter(item =>
      item.name.toLowerCase().includes(search.trim().toLowerCase()),
    );
  }, [favourites, search]);

  if (favourites.length === 0) {
    return (
      <Empty
        title="This is the place of your favs❤️"
        buttonText="Go in search"
        img={favouritesPageImage}
      />
    );
  }

  if (productsToRender.length === 0) {
    return <NoResults />;
  }

  return (
    <div>
      {!search && <Breadcrumb />}

      <div className="favourites">
        {search ? (
          <p className="favourites__text favourites__text--found">
            {`${productsToRender.length} results`}
          </p>
        ) : (
          <div className="favourites__top">
            <h1 className="favourites__title title">Favourites</h1>
            <p className="favourites__text">{`${favourites.length} items`}</p>
          </div>
        )}

        <div className="favourites__content">
          {productsToRender.map(pr => (
            <ProductCard product={pr} key={pr.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
