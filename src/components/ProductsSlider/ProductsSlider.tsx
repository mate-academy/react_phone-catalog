import { useMemo, useState } from 'react';
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

  const carouselWidth = useMemo(() => {
    return itemsCount * itemWidth + gap * (itemsCount - 1);
  }, []);

  const scrolledWidth = useMemo(() => {
    return itemsScrolled * itemWidth + itemsScrolled * gap;
  }, [itemsScrolled]);

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
            variant="arrow"
            arrowDirection="left"
            aria-label="slide-left"
            onClick={handleSlideLeft}
          />

          <Button
            disabled={itemsScrolled === itemsCount - 4}
            variant="arrow"
            aria-label="slide-right"
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
