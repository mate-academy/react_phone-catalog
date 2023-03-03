import React, { useEffect, useState } from 'react';
import '../../pages/page.scss';
import './SuggestedProducts.scss';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

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
    .filter(product => product.id !== selectedProduct.id);

  return (
    <section className="suggested-products page__section">
      <h2 className="page__section-title">
        You may also like
      </h2>

      <ProductsSlider products={filteredProducts} />
    </section>
  );
};
