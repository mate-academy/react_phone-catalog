import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductList } from '../../components/ProductList';
import { useFavorite } from '../../context/FavoriteContext';
import style from './FvoritePage.module.scss';
import { useCallback } from 'react';
import { ErrorScreen } from '../../components/ErrorScreen';
import { Search } from '../../components/Search';

export const FavoritePage = () => {
  const [searchParams] = useSearchParams();
  const { favorites } = useFavorite();
  const totalCountItems = favorites.length;

  const query = searchParams.get('query');
  const getFilteredFavorites = useCallback(() => {
    if (query) {
      return favorites.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return favorites;
  }, [query, favorites]);

  const filtredFavorites = getFilteredFavorites();

  return (
    <div className={style.favorites}>
      <Breadcrumbs category="Favorites" />

      <div className={style.favorites__containerTitle}>
        <h1 className={style.favorites__title}>Favorites</h1>
        <span
          className={style.favorites__countItems}
        >{`${totalCountItems} models`}</span>
      </div>

      {filtredFavorites.length > 0 && (
        <div className={style.favorites__wraperSearch}>
          <div className={style.favorites__search}>
            <Search />
          </div>
        </div>
      )}

      {favorites.length === 0 && (
        <h2 className={style.favorites__emptyTitle}>
          Your favorites list is empty
        </h2>
      )}

      {favorites.length > 0 && !filtredFavorites.length && (
        <ErrorScreen
          title={`There are no products matching the query ${query}`}
        />
      )}

      {filtredFavorites.length !== 0 && (
        <ProductList products={filtredFavorites} />
      )}
    </div>
  );
};
