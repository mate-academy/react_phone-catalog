import { useContext } from 'react';
import {
  StateContext,
} from '../libs/components/state-provider/state-context';

import { Products } from './products/Products';

export const FavoriteProductsPage: React.FC = () => {
  const { favorites } = useContext(StateContext);

  return (
    <Products pageTitle="Favorites" products={favorites} />
  );
};
