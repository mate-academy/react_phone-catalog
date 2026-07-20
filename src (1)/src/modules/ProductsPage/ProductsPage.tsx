import { useEffect, useState } from 'react';
import type { Category, Product } from '../../types/Product';
import { getProductsByCategory } from '../../api/products';
import { Loader } from '../shared/components/Loader';
import { useCart } from '../shared/context/CartContext';
import { useFavorites } from '../shared/context/FavoritesContext';

type Props = {
  category: Category;
  title: string;
};

export const ProductsPage = ({ category, title }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const loadProducts = () => {
    setIsLoading(true);
    setHasError(false);

    getProductsByCategory(category)
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(loadProducts, [category]);

  return (
    <div>
      <h1>{title}</h1>

      {isLoading && <Loader />}

      {!isLoading && hasError && (
        <div>
          <p>Something went wrong</p>
          <button type="button" onClick={loadProducts}>
            Reload
          </button>
        </div>
      )}

      {!isLoading && !hasError && products.length === 0 && (
        <p>There are no {title.toLowerCase()} yet</p>
      )}

      {!isLoading && !hasError && products.length > 0 && (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <span>{product.name}</span>
              <span>${product.price}</span>

              <button type="button" onClick={() => addToCart(product)}>
                {isInCart(product.itemId) ? 'Added to cart' : 'Add to cart'}
              </button>

              <button type="button" onClick={() => toggleFavorite(product)}>
                {isFavorite(product.itemId) ? '♥' : '♡'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
