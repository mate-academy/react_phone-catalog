import { useState } from 'react';
import { Product } from '../../shared/types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductSlider.scss';
import classNames from 'classnames';

type Props = {
  title: string;
  products: Product[];
};

const STEP = 288;

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const [offset, setOffset] = useState(0);
  const [ActiveLeftButton, setActiveLeftButton] = useState(false);
  const [ActiveRightButton, setActiveRightButton] = useState(true);
  const LAST_STEP = (ProductSlider.length - 4) * STEP;

  const handleLeftButton = () => {
    setOffset(currentOffset => {
      const newOffset = currentOffset + STEP;

      setActiveRightButton(true);

      if (newOffset === 0) {
        setActiveLeftButton(false);
        setActiveRightButton(true);

        return 0;
      }

      return newOffset;
    });
  };

  const handleRightButton = () => {
    setOffset(currentOffset => {
      const newOffset = currentOffset - STEP;

      if (newOffset === LAST_STEP) {
        setActiveRightButton(false);

        return LAST_STEP;
      }

      return newOffset;
    });

    setActiveLeftButton(true);
  };

  return (
    <div className="ProductSlider">
      <div className="ProductSlider__container">
        <div className="ProductSlider__top">
          <h2 className="ProductSlider__top-title">{title}</h2>
          <div className="ProductSlider__buttons">
            <button
              type="button"
              className="productsSlider__button"
              disabled={!ActiveLeftButton}
              onClick={handleLeftButton}
            >
              <div
                className={classNames('icon', 'icon--slider-left', {
                  'icon--slider-left--disabled': !ActiveLeftButton,
                })}
              />
            </button>

            <button
              type="button"
              className="productsSlider__button"
              disabled={!ActiveRightButton}
              onClick={handleRightButton}
            >
              <div
                className={classNames('icon', 'icon--slider-right', {
                  'icon--slider-right--disabled': !ActiveRightButton,
                })}
              />
            </button>
          </div>
        </div>
        <div className="ProductSlider__content">
          {products.map(product => (
            <div
              key={product.id}
              // style={translateStyle}
              className="ProductSlider__content-wrap"
              style={{ transform: `translateX(${offset}px)` }}
            >
              <ProductCard product={product} key={product.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
