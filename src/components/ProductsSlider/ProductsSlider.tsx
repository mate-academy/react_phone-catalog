import { FC, useState } from 'react';
import { Product } from '../../types/Product';
import './ProductsSlider.scss';
import { ProductCard } from '../ProductCard/ProductCard';

interface Props {
  products: Product[];
  title: string;
}

export const ProductsSlider: FC<Props> = ({ products, title }) => {
  const [start, setStart] = useState(0);
  const handleNext = () => {
    if (start + 4 < products.length) {
      setStart(start + 4);
    } else {
      setStart(0);
    }
  };

  const handlePrev = () => {
    if (start - 4 >= 0) {
      setStart(start - 4);
    } else {
      setStart(products.length - 4);
    }
  };

  return (
    <>
      <div className="hot-prices__top-wrapper">
        <h2 className="hot-prices__title">{title}</h2>
        <div className="hot-prices__slider-button-wrapper">
          <button
            className="hot-prices__slider-button"
            type="button"
            onClick={handlePrev}
          >
            {'<'}
          </button>
          <button
            className="hot-prices__slider-button"
            type="button"
            onClick={handleNext}
          >
            {'>'}
          </button>
        </div>
      </div>

      <div className="slider-container" data-cy="cardsContainer">
        {products.slice(start, start + 4).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            data-cy="cardsContainer"
          />
        ))}
      </div>
    </>
  );
};
