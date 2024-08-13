import React, { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard';
import { ProductPhone, ProductTablet, ProductAccessory } from '../../types/Product';
import { DropDown } from '../DropDown';

type ProductListProps = {
  typeOfProduct: string;
}

export const ProductList: React.FC<ProductListProps> = ( {typeOfProduct}) => {
  const [products, setProducts] = useState<(ProductPhone | ProductTablet | ProductAccessory)[]>([]);

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
      <DropDown />
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} /> {/* Pass product.id as productId */}
        </li>
      ))}
    </ul>
  );
};
