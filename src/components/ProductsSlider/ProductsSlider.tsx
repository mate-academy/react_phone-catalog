import React, { useRef } from 'react';
import { Product } from '../../types/product.types';
import { ProductCard } from '../ProductCard';
import { IconButton } from '../IconButton';
import './ProductsSlider.scss';

interface Props {
  title: string;
  products: Product[];
  favouriteIds: Set<string>;
  cartIds: Set<string>;
  onToggleFavourite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  favouriteIds,
  cartIds,
  onToggleFavourite,
  onAddToCart,
}) => {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const card = track.querySelector<HTMLElement>('.products-slider__item');
    const step = card ? card.offsetWidth + 16 : 272;

    track.scrollBy({ left: step * direction, behavior: 'smooth' });
  };

  return (
    <section className="products-slider">
      <div className="products-slider__header">
        <h2 className="products-slider__title">{title}</h2>

        <div className="products-slider__controls">
          <IconButton
            icon="chevron-left"
            ariaLabel={`Scroll ${title} left`}
            onClick={() => scrollByCard(-1)}
          />
          <IconButton
            icon="chevron-right"
            ariaLabel={`Scroll ${title} right`}
            onClick={() => scrollByCard(1)}
          />
        </div>
      </div>

      <ul className="products-slider__track" ref={trackRef}>
        {products.map(product => (
          <li key={product.id} className="products-slider__item">
            <ProductCard
              product={product}
              isFavourite={favouriteIds.has(product.itemId)}
              isInCart={cartIds.has(product.itemId)}
              onToggleFavourite={onToggleFavourite}
              onAddToCart={onAddToCart}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
