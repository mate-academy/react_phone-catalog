import { useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import './ProductSlider.scss';

type Props = {
  name: string,
  products: Product[]
};

export const ProductSlider: React.FC<Props> = ({ name, products }) => {
  const [offset, setOffset] = useState(0);

  function handleNextSlide() {
    setOffset(prevOffset => prevOffset + 1088);
    if (offset > 17408) {
      setOffset(0);
    }
  }

  function handlePrevSlide() {
    const featureOffset = offset - 1088;

    if (featureOffset < 0) {
      setOffset(18496);
    } else {
      setOffset((prevOffset) => prevOffset - 1088);
    }
  }

  return (
    <div className="slider">
      <div className="slider__top">
        <h1 className="slider__header">{name}</h1>
        <div className="slider__buttons">
          <button
            type="button"
            className="slider__button"
            onClick={handlePrevSlide}
          >
            {'<'}
          </button>
          <button
            type="button"
            className="slider__button"
            onClick={handleNextSlide}
          >
            {'>'}
          </button>
        </div>
      </div>

      <div className="slider__container">
        <div className="slider__slider">
          <div className="slider__line" style={{ left: `${-offset}px` }}>
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
