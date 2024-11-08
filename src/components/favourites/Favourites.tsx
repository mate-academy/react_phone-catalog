import { FC } from 'react';

import { Catalog } from '@components/catalog/';

import { useFavourites } from '@hooks/index';

import { CatalogTitle } from '@utils/types/catalog.interface';

export const Favourites: FC = () => {
  const { favouritesItems } = useFavourites();

  return <Catalog text={CatalogTitle.favourites} products={favouritesItems} />;
};
