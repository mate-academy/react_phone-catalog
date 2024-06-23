/* eslint-disable jsx-a11y/control-has-associated-label */
import './ProductsSlider.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [offset, setOffset] = useState(0);
  const [isNotActiveLeftButton, setIsNotActiveLeftButton] = useState(true);
  const [isNotActiveRightButton, setIsNotActiveRightButton] = useState(false);

  const lastElement = -(products.length * 288 - 288 * 4);

  const handleChangeButtons = (value: string) => {
    switch (value) {
      case 'left': {
        setOffset(currentOffset => {
          const newOffset = currentOffset + 288;

          if (newOffset > 0) {
            setIsNotActiveLeftButton(true);

            return 0;
          }

          return newOffset;
        });
        break;
      }

      case 'right': {
        setOffset(currentOffset => {
          const newOffset = currentOffset - 288;

          if (newOffset < lastElement) {
            return lastElement;
          }

          return newOffset;
        });

        break;
      }

      default:
        break;
    }
  };

  useEffect(() => {
    setIsNotActiveLeftButton(false);
    setIsNotActiveRightButton(false);

    if (offset === 0) {
      setIsNotActiveLeftButton(true);
    }

    if (offset === lastElement) {
      setIsNotActiveRightButton(true);
    }
  }, [offset]);

  return (
    <div className="productsSlider">
      <div className="productsSlider__header">
        <h1 className="productsSlider__title">{title}</h1>

        <div className="productsSlider__buttons">
          <button
            type="button"
            className="productsSlider__button"
            disabled={isNotActiveLeftButton}
            onClick={() => handleChangeButtons('left')}
          >
            <div
              className={classNames('icon', 'icon--arrow-left', {
                'icon--arrow-left--disabled': isNotActiveLeftButton,
              })}
            />
          </button>

          <button
            type="button"
            className="productsSlider__button"
            disabled={isNotActiveRightButton}
            onClick={() => handleChangeButtons('right')}
          >
            <div
              className={classNames('icon', 'icon--arrow-right', {
                'icon--arrow-right--disabled': isNotActiveRightButton,
              })}
            />
          </button>
        </div>
      </div>

      <div className="productsSlider__window">
        <div
          className="productsSlider__elements"
          style={{ transform: `translateX(${offset}px)` }}
        >
          {products.map(product => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
