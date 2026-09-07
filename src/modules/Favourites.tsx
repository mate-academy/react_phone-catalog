import { useCallback, useMemo, useState } from 'react';
import { useFavourites } from '../contexts/Favourites';
import { CatalogItem } from '../types/CatalogItem';
import { useProducts } from '../contexts/Products';
import { Catalog } from '../components/Catalog';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { Product } from '../types/Product';

export const FavouritesPage = () => {
  const { favouritesList } = useFavourites();
  const { phones, tablets, accessories } = useProducts();

  const allProducts = useMemo(
    () => [...(phones.items ?? []), ...(tablets.items ?? []), ...(accessories.items ?? [])],
    [phones.items, tablets.items, accessories.items],
  );

  const favourites: Product[] = useMemo(
    () =>
      favouritesList
        .map(id => allProducts.find(p => p.id === id))
        .filter((p): p is CatalogItem => Boolean(p)),
    [favouritesList, allProducts],
  );

  return (
    <>
      <BreadCrumbs />
      <Catalog pageName="Favourites" products={favourites} />
    </>
  );
};
