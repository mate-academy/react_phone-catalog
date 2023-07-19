import { useState } from 'react';
import { Product } from '../../types/Product';
import { Button } from '../Button/Button';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsSlider.scss';

type Props = {
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({
  products,
}) => {
  const [itemsScrolled, setItemsScrolled] = useState(0);

  const itemWidth = 272;
  const gap = 16;
  const itemsCount = products.length;
  const carouselWidth = itemsCount * itemWidth + gap * (itemsCount - 1);

  const scrolledWidth = itemsScrolled * itemWidth + itemsScrolled * gap;
  const transform = `translate(-${scrolledWidth}px, 0)`;

  const handleSlideLeft = () => {
    setItemsScrolled(itemsScrolled - 4);
  };

  const handleSlideRight = () => {
    setItemsScrolled(itemsScrolled + 4);
  };

  return (
    <div className="ProductsSlider">
      <div className="ProductsSlider__slider">
        <div className="ProductsSlider__buttons">
          <Button
            disabled={itemsScrolled === 0}
            content="arrow"
            arrowDirection="left"
            onClick={handleSlideLeft}
          />

          <Button
            disabled={itemsScrolled === itemsCount - 4}
            content="arrow"
            onClick={handleSlideRight}
          />
        </div>

        <div className="ProductsSlider__content">
          <ul
            className="ProductsSlider__content-list"
            data-cy="cardsContainer"
            style={{
              width: carouselWidth,
              transform,
            }}
          >
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
    </div>
  );
};
