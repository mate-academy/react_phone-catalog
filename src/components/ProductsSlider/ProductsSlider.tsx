import { useMemo, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

import './ProductsSlider.scss';

const CARD_WIDTH = 272;
const CARD_COUNT = 4;
const GAP = 16;
const SLIDE_WINDOW = CARD_COUNT * (CARD_WIDTH + GAP);
const MIN_OFFSET = 0;

type Props = {
  products: Product[],
  title: string,
};

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const [offsetWidth, setOffsetWidth] = useState(0);
  const maxOffset = useMemo(() => {
    return Math.floor(-SLIDE_WINDOW * (products.length / CARD_COUNT - 1));
  }, [products]);

  const sliderWidth = useMemo(() => {
    return products.length * CARD_WIDTH + (products.length - 1) * GAP;
  }, [products]);

  const styleProductList = {
    width: `${sliderWidth}px`,
    transform: `TranslateX(${offsetWidth}px)`,
  };

  const slideLeft = () => {
    setOffsetWidth(currentOffset => {
      return Math.min(currentOffset + SLIDE_WINDOW, MIN_OFFSET);
    });
  };

  const slideRight = () => {
    setOffsetWidth(currentOffset => {
      return Math.max(currentOffset - SLIDE_WINDOW, maxOffset);
    });
  };

  return (
    <div className="ProductsSlider">
      <div className="ProductsSlider-Top">
        <h2 className="ProductsSlider-Title SectionTitle">
          {title}
        </h2>

        <button
          className="ProductsSlider-Icon Icon Icon_arrow Icon_arrow_left"
          type="button"
          aria-label="Arrow left"
          onClick={slideLeft}
          disabled={offsetWidth === MIN_OFFSET}
        />

        <button
          className="ProductsSlider-Icon Icon Icon_arrow"
          type="button"
          aria-label="Arrow Right"
          onClick={slideRight}
          disabled={offsetWidth === maxOffset}
        />
      </div>

      <div className="ProductsSlider-Window">
        <div
          className="ProductsSlider-Slides"
          data-cy="cardsContainer"
          style={styleProductList}
        >
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
