import { useFavorites } from '../../context/FavoritesContext';
import { api } from '../../api';
import { useEffect, useState } from 'react';
import { Product } from '../../types';
import { ProductsList } from '../catalog/components/ProductsList';

export const FavoritesPage: React.FC = () => {
  const { ids } = useFavorites();
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    api.getProducts('phones').then(all => {
      setProducts(all.filter(p => ids.has(p.id)));
    });
  }, [ids]);

  return (
    <div>
      <h1>Favorites</h1>
      {!products && <div className="loader">Loading…</div>}
      {products && products.length === 0 && <p>No favorites yet</p>}
      {products && products.length > 0 && <ProductsList products={products} />}
    </div>
  );
};
