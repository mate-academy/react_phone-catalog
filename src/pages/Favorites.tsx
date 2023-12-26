import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { NoResults } from '../components/NoResults';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductsList } from '../components/ProductsList';
import { NoSearchResults } from '../components/NoSearchResults';
import { useAppSelector } from '../app/hooks';
import { Error } from '../components/Error';

export const Favorites = () => {
  const [searchParams] = useSearchParams();
  const { favorites, error } = useAppSelector(state => state.favorites);

  const filteredFavorites = useMemo(() => {
    if (favorites.length === 0) {
      return [];
    }

    const newFavorites = [...favorites];

    const query = searchParams.get('query');

    if (query) {
      return newFavorites.filter(favorite => (
        favorite.name.toLowerCase().includes(query.toLowerCase())
      ));
    }

    return newFavorites;
  }, [searchParams, favorites]);

  if (error) {
    return (<Error />);
  }

  if (favorites.length !== 0 && filteredFavorites.length === 0) {
    return (<NoSearchResults />);
  }

  return (
    <main className="main main--page">
      <div className="main__header">
        <Breadcrumbs currentPage="Favorites" />

        <h1 className="main__title main__title--page">Favorites</h1>

        {favorites.length !== 0 && (
          <div className="main__description">
            {searchParams.get('query')
              ? `${filteredFavorites.length} result${filteredFavorites.length === 1 ? '' : 's'}`
              : `${favorites.length} item${favorites.length !== 1 ? 's' : ''}`}
          </div>
        )}
      </div>

      {favorites.length === 0 && (<NoResults category="favorites" />)}

      {filteredFavorites.length !== 0 && (
        <section className="main__section">
          <ProductsList products={filteredFavorites} />
        </section>
      )}
    </main>
  );
};
