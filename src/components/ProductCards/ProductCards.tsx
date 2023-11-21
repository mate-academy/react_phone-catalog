import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';

import './ProductCards.scss';

import { ProductCard } from '../ProductCard/ProductCard';

export const ProductCards = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/_new/products.json')
      .then((response) => response.json())
      .then((productsFromServer) => setProducts(productsFromServer));
  }, []);

  const productCard = products.map((product) => (
    <ProductCard product={product} />
  ));

  return <div className="product__cards">{productCard}</div>;
};
