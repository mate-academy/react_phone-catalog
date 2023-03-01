import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../ProductsSlider';
import './SuggestedProducts.scss';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

type Props = {
  selectedProduct: Product;
};

export const SuggestedProducts: React.FC<Props> = ({ selectedProduct }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(BASE_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      })
      .then(setProducts);
  }, []);

  const filteredProducts = products
    .filter(product => {
      return product.id !== selectedProduct.id
        && product.type === selectedProduct.type;
    });

  return (
    <div className="suggested-products">
      <h2 className="suggested-products__title">
        You may also like
      </h2>

      <ProductsSlider products={filteredProducts} />
    </div>
  );
};
