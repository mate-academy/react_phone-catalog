import type { Product } from '../types';
import type { CartItem } from '../types';
import { Container } from '../shared/components/Container';
import { Breadcrumbs } from '../shared/components/Breadcrums';
import { ProductsList } from '../shared/components/ProductsList';

type Props = {
  cart: CartItem[];
  favorites: Product[];
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
};

export const FavoritesPage: React.FC<Props> = ({
  cart,
  favorites,
  onAddToCart,
  onToggleFavorite,
}) => {
  const cartIds = new Set(cart.map(item => item.product.itemId));
  const favoriteIds = new Set(favorites.map(item => item.itemId));

  return (
    <Container>
      <Breadcrumbs />
      <h1>Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        <ProductsList
          products={favorites}
          cartIds={cartIds}
          favoriteIds={favoriteIds}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </Container>
  );
};
