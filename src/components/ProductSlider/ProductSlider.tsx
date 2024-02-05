import { useState } from 'react';
import { Icons } from '../../types/enums/Icons';
import { Icon } from '../Icon';
import { ProductCard } from '../ProductCard';
import './ProductSlider.scss';
import { Item } from '../../types/interface/Item';

interface Props {
  title: string,
  products: Item[],
}

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const ITEM_WIDTH = 272;
  const GAP = 16;

  const [position, setPosition] = useState(0);

  const onScrollNext = () => {
    setPosition(() => {
      return position - (ITEM_WIDTH + GAP);
    });
  };

  const onScrollPrev = () => {
    setPosition(() => {
      return position + (ITEM_WIDTH + GAP);
    });
  };

  const maxPosition = (products?.length - 4) * (ITEM_WIDTH + GAP);

  const canScrollNext = position > maxPosition * -1;
  const canScrollPrev = position < 0;

  return (
    <div className="productSlider">
      <div className="productSlider__header">
        <h1 className="productSlider__title">{title}</h1>
        <div className="productSlider__controls">
          <button
            aria-label="<"
            type="button"
            className="productSlider__button"
            onClick={onScrollPrev}
            disabled={!canScrollPrev}
          >
            <Icon icon={Icons.ArrowLeft} />
          </button>
          <button
            aria-label=">"
            type="button"
            className="productSlider__button"
            onClick={onScrollNext}
            disabled={!canScrollNext}
          >
            <Icon icon={Icons.ArrowRight} />
          </button>
        </div>
      </div>
      <ul className="productSlider__container">
        {products.map(product => (
          <li
            key={product?.id}
            style={{
              listStyle: 'none',
              transform: `translateX(${position}px)`,
              transition: '0.5s',
            }}
          >
            <ProductCard item={product} key={product.itemId} />
          </li>
        ))}
      </ul>
    </div>
  );
};
