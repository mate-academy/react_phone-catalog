import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

import { useAppSelector } from '../../app/hooks';
import { SearchParamsNames } from '../../constants';

import {
  Breadcrumbs,
  SectionHeader,
  ProductCard,
  NoResults,
  NoSearchResults,
} from '../../components';

import './FavouritesPage.scss';

export const FavouritesPage = () => {
  const [searchParams] = useSearchParams();
  const { favouritesItems } = useAppSelector(state => state.favouritesItems);
  const favouritesItemsCount = favouritesItems.length;
  const searchQuery = searchParams.get(SearchParamsNames.query) || '';

  const visibleItems = useMemo(() => (
    searchQuery
      ? favouritesItems.filter(item => (
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ))
      : favouritesItems
  ), [favouritesItems, searchQuery]);
  const visibleItemsCount = visibleItems.length;

  return (
    <div className="favourites">
      <Breadcrumbs />
      <SectionHeader
        title="Favourites"
        subtitle={
          favouritesItemsCount
            ? `${visibleItemsCount} ${searchQuery ? 'results' : 'items'}`
            : undefined
        }
      />
      { !!favouritesItems.length && (
        visibleItems.length
          ? (
            <div className="favourites__cards">
              {
                visibleItems.map(item => (
                  <ProductCard product={item} key={item.id} />
                ))
              }
            </div>
          )
          : <NoSearchResults />
      )}

      { !favouritesItems.length && (
        <NoResults title="Your favourites list is empty" />
      )}
    </div>
  );
};
