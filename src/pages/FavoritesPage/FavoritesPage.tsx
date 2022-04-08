import { FunctionComponent, useContext } from 'react';

// Contexts
import { FavouritesContext } from '../../contexts/FavoritesProvider';

// Types
import { Product } from '../../types/Product';

// Components
import { ProductsPage } from '../ProductsPage';

export const FavoritesPage: FunctionComponent = () => {
  const { favourites } = useContext(FavouritesContext);
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const favouritesProducts = products.filter((product: Product) => favourites.includes(product.id));

  return (
    <ProductsPage
      title="Favourites"
      products={favouritesProducts}
    />
  );
};
