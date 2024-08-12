import React, { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard';
import { ProductPhone, ProductTablet } from '../../types/Product';

type ProductListProps = {
  typeOfProduct: string;
}

export const ProductList: React.FC<ProductListProps> = ( {typeOfProduct}) => {
  const [products, setProducts] = useState<(ProductPhone | ProductTablet)[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`../../api/${typeOfProduct}.json`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [typeOfProduct]);

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
