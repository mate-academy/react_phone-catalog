import React, { useMemo, useState } from 'react';
import { Button } from '../Button/Button';
import './ProductSlider.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

interface Props {
  products: Product[];
  title?: string;
}

export const ProductSlider: React.FC<Props> = ({ products, title }) => {
  const itemsWidth = 272;
  const gap = 16;

  const carouselWidth = useMemo(() => {
    return products.length * itemsWidth + (products.length - 1) * gap;
  }, []);

  const [itemsScrolled, setItemScrolled] = useState(0);

  const scrolledWidth = useMemo(() => {
    return itemsScrolled * itemsWidth + itemsScrolled * gap;
  }, [itemsScrolled]);

  const slide = `translate(-${scrolledWidth}px, 0)`;

  const handeSlideLeft = () => {
    setItemScrolled(itemsScrolled - 4);
  };

  const handeSlideRight = () => {
    setItemScrolled(itemsScrolled + 4);
  };

  return (
    <div className="ProductSlider">
      <div className="ProductSlider__header">
        <h2 className="ProductSlider__title">{title}</h2>

        <div className="ProductSlider__buttons">
          <Button
            variant="arrow"
            arrowDirection="left"
            disabled={itemsScrolled === 0}
            aria-label="swipe phones left"
            onClick={handeSlideLeft}
          />

          <Button
            variant="arrow"
            disabled={itemsScrolled >= products.length - 4}
            aria-label="swipe phones right"
            onClick={handeSlideRight}
          />
        </div>
      </div>

      <div className="ProductSlider__content">
        <ul
          className="ProductSlider__content-list"
          style={{
            width: carouselWidth,
            transform: slide,
          }}
        >
          {products.map(product => (
            <li key={product.itemId}>
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

ProductSlider.defaultProps = {
  title: '',
};
