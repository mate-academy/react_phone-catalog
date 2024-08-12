import React, { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

/* type ProductListProps = {
  productId: string; // Identyfikator produktu do pobrania danych
}; */

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('../../api/phones.json');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  console.log('products after fetch:', products); // Log products after fetch

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard productId={product.id} /> {/* Pass product.id as productId */}
        </li>
      ))}
    </ul>
  );
};
