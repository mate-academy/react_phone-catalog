import { useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  products: Product[];
  title: string;
};

export const ProductSlider: React.FC<Props> = ({
  products: hotPriceProducts,
  title,
}) => {
  const [currIndex, setCurrIndex] = useState(0);
  const itemWidth = 272;
  const gap = 16;
  const animationDuration = 500;
  const step = 1;
  const perPage = 4;
  const prevDisabled = currIndex === 0;
  const nextDisabled = currIndex === hotPriceProducts.length - perPage;

  const handleNextBtn = () => {
    const lastItemIndex = hotPriceProducts.length - 1;

    setCurrIndex((prevIndex) => (prevIndex + step > lastItemIndex
      ? 0 : prevIndex + step));
  };

  const handlePrevBtn = () => {
    const firstItemIndex = 0;
    const lastItemIndex = hotPriceProducts.length - 1;

    setCurrIndex((prevIndex) => (prevIndex - step < firstItemIndex
      ? lastItemIndex : prevIndex - step));
  };

  return (
    <div className="productSlider">
      <div className="productSlider__top">
        <h2 className="productSlider__top--title">
          {title}
        </h2>
        <div className="productSlider__top--buttons">
          <button
            type="button"
            title="Previous"
            className={classNames('productSlider__button', {
              'productSlider__button--disabled': prevDisabled,
            })}
            onClick={handlePrevBtn}
            disabled={prevDisabled}
          >
            <span className={classNames('arrow arrow--left', {
              'arrow--left-disabled': prevDisabled,
            })}
            />
          </button>

          <button
            type="button"
            title="Next"
            className={classNames('productSlider__button', {
              'productSlider__button--disabled': nextDisabled,
            })}
            onClick={handleNextBtn}
            disabled={nextDisabled}
          >
            <span className={classNames('arrow arrow--right', {
              'arrow--right-disabled': nextDisabled,
            })}
            />
          </button>
        </div>

      </div>

      <div className="productSlider__main">
        <ul
          className="productSlider__list"
        >
          {hotPriceProducts.map((product) => (
            <li
              key={product.id}
              style={{
                transform: `translateX(-${currIndex * (itemWidth + gap)}px)`,
                transition: `${animationDuration}ms`,
                width: `${(itemWidth)}px`,
              }}
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
