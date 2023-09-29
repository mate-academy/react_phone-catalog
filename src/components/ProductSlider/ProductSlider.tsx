import React, { useState } from 'react';
import { Button } from '../Button/Button';
import './ProductSlider.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({ products }) => {
  const [itemsScrolled] = useState(0);

  return (
    <div className="ProductSlider">
      <div className="ProductSlider__buttons">
        <Button
          variant="arrow"
          arrowDirection="left"
          disabled={itemsScrolled === 0}
          aria-label="swipe phones left"
        />

        <Button
          variant="arrow"
          disabled={itemsScrolled === products.length - 4}
          aria-label="swipe phones right"
        />
      </div>

      <div className="ProductSlider__content">
        <ul className="ProductSlider__content-list">
          {products.map(product => (
            <li key={product.id}>
              <ProductCard
                product={product}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
