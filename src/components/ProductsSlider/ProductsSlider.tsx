import { useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsSlider.scss';

type Props = {
  title: string;
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const cardWidth = 272;
  const gap = 16;
  const lastIndex = products.length - 5;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  const handleLeftButton = () => {
    const index = currentCardIndex - 4 >= 0 ? currentCardIndex - 4 : 0;

    setCurrentCardIndex(index);
    setTranslateValue(cardWidth * index + gap * index);
  };

  const handleRightButton = () => {
    const index =
      currentCardIndex + 4 <= lastIndex ? currentCardIndex + 4 : lastIndex;

    setCurrentCardIndex(index);
    setTranslateValue(cardWidth * index + gap * index);
  };

  return (
    <section className="slider">
      <div className="slider__content">
        <div className="slider__top">
          <h2 className="slider__title title--h2">{title}</h2>
          <div className="slider__buttons">
            <button
              disabled={currentCardIndex === 0}
              type="button"
              className={`slider__button icon ${currentCardIndex === 0 ? 'icon--disabled-left' : 'icon--left'}`}
              aria-label="slide left"
              onClick={handleLeftButton}
            />
            <button
              disabled={currentCardIndex === lastIndex}
              type="button"
              className={`slider__button icon ${currentCardIndex === lastIndex ? 'icon--disabled-right' : 'icon--right'}`}
              aria-label="slide right"
              onClick={handleRightButton}
            />
          </div>
        </div>
        <div className="slider__cards-container" data-cy="cardsContainer">
          <div
            className="slider__cards"
            style={{ transform: `translateX(-${translateValue}px)` }}
          >
            {products.map(product => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
