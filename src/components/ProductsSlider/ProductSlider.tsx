import { useEffect, useRef, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductSlider.scss';
import { Product } from '../../helpers/types/Product';

const CARD_WIDTH = 272 + 16;

const ProductsSlider = ({
  productData, title, keyExtractor,
}:
{
  productData: Product[],
  title: React.ReactNode,
  keyExtractor: (product: Product) => string,
}) => {
  const [offset, setOffset] = useState(864);
  const leftButtonRef = useRef<HTMLButtonElement | null>(null);
  const rightButtonRef = useRef<HTMLButtonElement | null>(null);

  const handlePrev = () => {
    const newOffset = Math.min(offset + CARD_WIDTH, 864);

    setOffset(newOffset);
  };

  const handleNext = () => {
    const newOffset = Math.max(offset - CARD_WIDTH, -864);

    setOffset(newOffset);
  };

  useEffect(() => {
    if (offset === 864) {
      leftButtonRef.current?.classList.add('disabled');
    } else {
      leftButtonRef.current?.classList.remove('disabled');
    }

    if (offset === -864) {
      rightButtonRef.current?.classList.add('disabled');
    } else {
      rightButtonRef.current?.classList.remove('disabled');
    }
  }, [offset]);

  return (
    <div data-cy="cardsContainer" className="slider">
      <div className="slider_titlewithbuttons">
        <h1 className="slider_titlewithbuttons_title">{title}</h1>
        <div className="slider_buttons">
          <button
            ref={leftButtonRef}
            onClick={handlePrev}
            type="button"
            className="slider_buttons_left"
            aria-label="Previous"
          />

          <button
            ref={rightButtonRef}
            onClick={handleNext}
            type="button"
            className="slider_buttons_right"
            aria-label="Next"
          />
        </div>
      </div>

      <div className="slider_products" style={{ transform: `translateX(${offset}px)` }}>
        {productData.map(product => {
          return (
            <ProductCard product={product} key={keyExtractor(product)} />
          );
        })}
      </div>
    </div>
  );
};

export default ProductsSlider;
