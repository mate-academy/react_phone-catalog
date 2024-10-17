import { FC } from 'react';

import { Catalog } from '@components/catalog/Catalog';

import { useFavourites } from '@hooks/useFavourites';

export const Favourites: FC = () => {
  const { favouritesItems } = useFavourites();

  return (
    <Catalog title="Favourites" products={favouritesItems} text="Favourites" />
  );
};
