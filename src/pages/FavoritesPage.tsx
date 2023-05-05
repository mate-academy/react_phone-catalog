import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Message } from '../components/Message';
import { FavoritesContext } from '../helpers/favoritesHelper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductsList } from '../components/ProductsList';

export const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase();

  const visibleFavorites = query
    ? favorites.filter(item => item.name.toLowerCase().includes(query))
    : favorites;

  return (
    <div className="favorites-page">
      <div className="favorites-page__breadcrumbs">
        <Breadcrumbs />
      </div>

      <section>
        <h1 className="favorites-page__title">Favorites</h1>
        <div className="favorites-page__quantity">{`${favorites.length} items`}</div>
        {!!visibleFavorites.length && (
          <div className="favorites-page__products-container">
            <ProductsList products={visibleFavorites} />
          </div>
        )}
        {!!favorites.length && !visibleFavorites.length && (
          <Message message="No search results" isError={false} />
        )}
        {!favorites.length && (
          <Message message="Your favorites is empty" isError={false} />
        )}
      </section>
    </div>
  );
};
