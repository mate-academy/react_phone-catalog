import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList';
import { StateContext } from '../../components/Store';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import './style.scss';
import { getFilteredItem } from '../../helpers/getFilteredItems';
import { NoSearchResults } from '../../components/NoSearchResults';

export const FavoritesPage = () => {
  const { favoriteItems } = useContext(StateContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const filteredItems = getFilteredItem(favoriteItems, query);
  const isNoResult = query && !filteredItems.length;

  return (
    <section className="favoritesPage">
      <div className="favoritesPage__breadcrumbs">
        <Breadcrumbs page="Favorites" />
      </div>
      <h1 className="favoritesPage__title">
        Favorites
      </h1>

      {!favoriteItems.length && <h2>Favorites is Empty now</h2>}

      {filteredItems.length ? (
        <>
          <h4 className="favoritesPage__subtitle">
            {`${filteredItems.length} items`}
          </h4>
          <ProductsList data={filteredItems} />
        </>
      ) : (
        isNoResult && <NoSearchResults />
      )}
    </section>
  );
};
