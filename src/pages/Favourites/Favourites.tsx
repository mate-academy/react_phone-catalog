import { useContext, useMemo } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import './Favourites.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { FavouriteContext } from '../../components/GlobalFavouritesProvider';
import { Product } from '../../types/Product';
import { normalizeValue } from '../../helpers/normalizeValue';
import {
  NoSearchResults,
} from '../../components/NoSearchResults/NoSearchResults';
import { GoBackButton } from '../../components/GoBackButton/GoBackButton';

export const Favourites = () => {
  const { favourites } = useContext(FavouriteContext);
  const products = useOutletContext<Product[]>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const items = useMemo(() => {
    return products.filter(product => favourites.includes(product.id));
  }, [favourites]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const normalizedQuery = normalizeValue(query);
      const normalizedName = normalizeValue(item.name);

      return normalizedName.includes(normalizedQuery);
    });
  }, [items, query]);

  const filteredItemsCount = filteredItems.length;

  const itemsCount = `${filteredItemsCount} item${
    filteredItemsCount === 1 ? '' : 's'
  }`;

  return (
    <div className="Favourites container">
      <div className="Favourites__breadcrumbs">
        <Breadcrumbs />
      </div>

      <div className="Favourites__return">
        <GoBackButton />
      </div>

      <div className="Favourites__title">
        <h1>
          Favourites
        </h1>
      </div>

      <div className="Favourites__items-count">
        <p>
          {!!filteredItemsCount && itemsCount}
        </p>
      </div>

      {!filteredItems.length && query && (
        <NoSearchResults category="favourites" />
      )}

      {!items.length && !query
        ? (
          <h2 className="Favourites__no-items-message">
            No favourite items
          </h2>
        )
        : <ProductsList items={filteredItems} />}
    </div>
  );
};
