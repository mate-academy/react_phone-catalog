import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LocalContext } from '../LocalContext';
import { NoResults } from '../components/NoResults';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductsList } from '../components/ProductsList';
import { NoSearchResults } from '../components/NoSearchResults';

export const Favorites = () => {
  const [searchParams] = useSearchParams();
  const { favorites } = useContext(LocalContext);

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
  }, [searchParams.get('query'), favorites]);

  if (favorites.length !== 0 && filteredFavorites.length === 0) {
    return (<NoSearchResults />);
  }

  return (
    <main className="main main--page">
      {searchParams.get('query') && favorites.length !== 0 && (
        <div className="main__header main__header--results">
          <div className="main__description">
            {`${filteredFavorites.length} result${filteredFavorites.length === 1 ? '' : 's'}`}
          </div>
        </div>
      )}

      {(!searchParams.get('query') || favorites.length === 0) && (
        <div className="main__header">
          <Breadcrumbs currentPage="Favorites" />

          <h1 className="main__title main__title--page">Favorites</h1>

          {favorites.length !== 0 && (
            <div className="main__description">
              {`${favorites.length} item${favorites.length !== 1 ? 's' : ''}`}
            </div>
          )}
        </div>
      )}

      {favorites.length === 0 && (<NoResults category="favorites" />)}

      {filteredFavorites.length !== 0 && (
        <section className="main__section">
          <ProductsList products={filteredFavorites} />
        </section>
      )}
    </main>
  );
};
