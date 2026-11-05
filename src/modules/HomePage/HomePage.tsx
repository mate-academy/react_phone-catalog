import { useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { ProductCard } from '../shared/components/ProductCard';

// TEMPORARY TEST: remove before committing
export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(data => setProducts(data.slice(0, 4)));
  }, []);

  return (
    <>
      <h1>Product Catalog</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {products.map(product => (
          <div key={product.id} style={{ width: '272px' }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
};
