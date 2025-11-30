import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './ProductsSlider.module.scss';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [step, setStep] = useState(0);
  const itemWidth = 272;
  const gap = 16;
  const frameSize = 4;
  const animationDuration = 1000;
  const [isPrevHovered, setIsPrevHovered] = useState(false);
  const [isNextHovered, setIsNextHovered] = useState(false);

  const stepWidth = itemWidth + gap;
  const maxStep = products.length - frameSize;
  const effectiveMaxStep = maxStep > 0 ? maxStep : 0;

  const handlePrev = () => {
    setStep(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setStep(prev => (prev < maxStep ? prev + 1 : prev));
  };

  return (
    <div className={styles.slider}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttons}>
          <button
            className={classNames(styles.button, {
              [styles.disabled]: step === 0,
            })}
            onClick={handlePrev}
            disabled={step === 0}
            onMouseEnter={() => setIsPrevHovered(true)}
            onMouseLeave={() => setIsPrevHovered(false)}
          >
            <img
              src={
                isPrevHovered
                  ? '/img/icons/ArrowLeft.png'
                  : '/img/icons/ArrowLeftHollow.png'
              }
              alt="Previous"
            />
          </button>

          <button
            className={classNames(styles.button, {
              [styles.disabled]: step === effectiveMaxStep,
            })}
            onClick={handleNext}
            disabled={step === effectiveMaxStep}
            onMouseEnter={() => setIsNextHovered(true)}
            onMouseLeave={() => setIsNextHovered(false)}
          >
            <img
              src={
                isNextHovered
                  ? '/img/icons/ArrowRight.png'
                  : '/img/icons/ArrowRightHollow.png'
              }
              alt="Next"
            />
          </button>
        </div>
      </div>

      <div className={styles.frame}>
        <div
          className={styles.list}
          style={{
            transform: `translateX(-${step * stepWidth}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {products.map(product => (
            <div key={product.id} className={styles.cardWrapper}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
