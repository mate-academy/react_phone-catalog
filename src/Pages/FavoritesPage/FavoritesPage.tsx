import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { ModelList } from '../../components/ModelList';
import { PageTop } from '../../components/PageTop';
import { EmptySearch } from '../../components/EmptySearch';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredFavorites = useMemo(() => {
    const trimmed = query.trim().toLowerCase();

    if (!trimmed) {
      return favorites;
    }

    return favorites.filter(item => item.name.toLowerCase().includes(trimmed));
  }, [favorites, query]);

  const hasNoSearchResults =
    query.trim().length > 0 && filteredFavorites.length === 0;

  return (
    <main className={styles.main}>
      <PageTop
        titleText="Favourites"
        titleLevel="1"
        modelsAmount={filteredFavorites.length}
        itemsContent="items"
      />
      {hasNoSearchResults ? (
        <EmptySearch message="There are no products matching the query" />
      ) : (
        <ModelList models={filteredFavorites} kindOfModel="product" />
      )}
    </main>
  );
};
