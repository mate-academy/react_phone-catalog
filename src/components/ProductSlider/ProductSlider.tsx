import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ProductCard } from '../ProductCard';
import classNames from 'classnames';
import { getDeviceType } from '../../utils/getDeviceType';
import { ProductsTypes } from '../../types/ProductsTypes';
import { Product } from '../../types/Product';

type Props = {
  parentClassName?: string;
  products: Product[];
  title: string;
};

export const ProductSlider: React.FC<Props> = ({
  parentClassName,
  products,
  title,
}) => {
  const [blockLeft, setBlockLeft] = useState(0);
  const productsBlock = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(getDeviceType(304, 253, 288));
  const handleNext = () => {
    if (productsBlock.current) {
      setBlockLeft(prev => prev - step);
    }
  };

  const handlePrev = () => {
    if (productsBlock.current) {
      setBlockLeft(prev => prev + step);
    }
  };

  const handleResize = useCallback(() => {
    setBlockLeft(0);
    setStep(getDeviceType(304, 253, 288));
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (productsBlock.current) {
      productsBlock.current.style.left = `${blockLeft}px`;
    }
  }, [blockLeft]);

  return (
    <article
      className={classNames('product-slider', {
        [`${parentClassName}__product-slider`]: parentClassName,
      })}
    >
      <div className="product-slider__header">
        <h2 className="product-slider__title">{title}</h2>
        <div className="product-slider__buttons">
          <button
            disabled={blockLeft === 0}
            onClick={handlePrev}
            className="product-slider__button product-slider__button-prev"
          ></button>
          <button
            disabled={
              products.length - -blockLeft / step === getDeviceType(1, 3, 4)
            }
            onClick={handleNext}
            className="product-slider__button product-slider__button-next"
          ></button>
        </div>
      </div>
      <div className="product-slider__items" ref={productsBlock}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            productType={ProductsTypes.Phones}
          />
        ))}
      </div>
    </article>
  );
};
