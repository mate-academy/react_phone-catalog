import { FC } from 'react';

import { Catalog } from '@components/catalog/Catalog';
import { useAppSelector } from '@hooks/hook';

export const Favorite: FC = () => {
  const { items } = useAppSelector(state => state.favorite);

  console.log(items.length);

  return <Catalog title="Favorites" products={items} text="Favorites" />;
};
