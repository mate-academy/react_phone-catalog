import { useState } from 'react';
import { ProductCard } from '../ProductCard';
import './ProductSlider.scss';
import { Product } from '../../../types/Product';

type Props = {
  products: Product[] | [];
  title: string;
  isDiscount: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  title,
  isDiscount,
}) => {
  const [count, setCount] = useState(0);

  const handlePrev = () => {
    if (count === 0) {
      return;
    }

    setCount(currentCount => currentCount - 1);
  };

  const handleNext = () => {
    if (count === products.length - 1) {
      return;
    }

    setCount(currentCount => currentCount + 1);
  };

  return (
    <div className="new-models">
      <div className="top-title">
        <div className="container">
          <div className="top-title__content">
            <h2 className="top-title__title">{title}</h2>
            <div className="top-title__buttons">
              <button
                className="top-title__prev button__prev"
                disabled={count === 0}
                onClick={handlePrev}
              ></button>
              <button
                className="top-title__next button__next"
                disabled={count === products.length - 1}
                onClick={handleNext}
              ></button>
            </div>
          </div>
        </div>
      </div>
      <div className="new-models__slider">
        <div className="new-models__content">
          <div
            className="new-models__wrapper"
            style={{ transform: `translateX(${-288 * count}px)` }}
          >
            {products.slice(0, 10).map(phone => (
              <ProductCard
                key={phone.id}
                product={phone}
                isDiscount={isDiscount}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
