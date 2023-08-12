import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Favourites.scss';
import { Crumbs } from '../../components/Crumbs/Crumbs';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { normalizeValue } from '../../utils/normalizeValue';
import { NoSearchResults }
  from '../../components/NoSearchResults/NoSearchResults';
import { GoBackButton } from '../../components/GoBackButton/GoBackButton';
import { useAppSelector } from '../../app/hooks';

export const Favourites = () => {
  const favourites = useAppSelector(state => state.favourites);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredItems = useMemo(() => {
    return favourites.filter(item => {
      const normalizedQuery = normalizeValue(query);
      const normalizedName = normalizeValue(item.name);

      return normalizedName.includes(normalizedQuery);
    });
  }, [favourites, query]);

  const filteredItemsCount = filteredItems.length;

  const itemsCount = `${filteredItemsCount} item ${
    filteredItemsCount === 1 ? '' : 's'
  }`;

  return (
    <div className="Favourites container">
      <div className="Favourites__crumbs">
        <Crumbs />
      </div>

      <div className="Favourites__return">
        <GoBackButton />
      </div>

      <div className="Favourites__title">
        <h1>Favourites</h1>
      </div>

      <div className="Favourites__items-count">
        <p>
          {!!filteredItemsCount && itemsCount}
        </p>
      </div>

      {!filteredItems.length && query && (
        <NoSearchResults category="favourites" />
      )}

      {!favourites.length && !query
        ? (
          <h2 className="Favourites__no-items-message">
            No favourites items
          </h2>
        )
        : <ProductsList items={filteredItems} />}
    </div>
  );
};
