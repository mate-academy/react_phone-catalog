import { useSearchParams } from 'react-router-dom';

import './styles/Page.scss';
import { useAppSelector } from '../helpers/app/hooks';

import { ProductsList } from '../components/ProductsList';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { NoResults } from '../components/NoResults';

export const FavoritesPage = () => {
  const { favorites } = useAppSelector(state => state.favorites);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <div className="Page">
      {!query && (
        <>
          <Breadcrumbs />

          <div className="Page__top">
            <h1 className="Page__title">Favorites</h1>
            <p className="Page__amount">{`${favorites.length} models`}</p>
          </div>
        </>
      )}

      {!favorites.length ? (
        <NoResults categoryName="Favorites" />
      ) : (
        <ProductsList products={favorites} />
      )}
    </div>
  );
};
