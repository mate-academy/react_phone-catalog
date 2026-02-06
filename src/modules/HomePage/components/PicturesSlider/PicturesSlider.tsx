import styles from './PicturesSlider.module.scss';

import { Product } from '../../../../../public/api/types/Product';

type PicturesSliderProps = {
  products: Product[] | null;
  currentIndex: number;
  handlePrev: () => void;
  handleNext: () => void;
  handleTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  handleTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
  sliderRef?: React.RefObject<HTMLDivElement>;
};

export const PicturesSlider: React.FC<PicturesSliderProps> = ({
  products,
  currentIndex,
  handlePrev,
  handleNext,
  handleTouchStart,
  handleTouchEnd,
  sliderRef,
}) => {
  const selectedProduct = products ? products[currentIndex ?? 0] : null;

  return (
    <div
      className={styles.picturesSlider}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      ref={sliderRef}
    >
      <div className={`${styles.picturesSlider__button}`}>
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous"
          className={`${styles.link}`}
        >
          <picture>
            <source
              srcSet="img/buttons/button-slider-left-desktop.svg"
              media="(min-width: 1024px)"
            />
            <source
              srcSet="img/buttons/button-slider-left-tablet.svg"
              media="(min-width: 576px)"
            />
            <img
              src="img/buttons/button-slider-left-tablet.svg"
              alt="The button slider left"
              title="The button slider left"
              className={`${styles['picturesSlider__button-slider-left']}`}
            />
          </picture>
        </button>
      </div>
      <div className={styles.picturesSlider__banner}>
        {selectedProduct && (
          <div className={styles.picturesSlider__content}>
            <div className={styles.picture}>
              <img
                src={`/${selectedProduct.image}`}
                alt={selectedProduct.name ?? 'Product Image'}
                title={selectedProduct.name ?? 'Product Image'}
                className={styles.picturesSlider__productImage}
              />
            </div>
          </div>
        )}
      </div>
      <div className={styles.picturesSlider__button}>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next"
          className={`${styles.link}`}
        >
          <picture>
            <source
              srcSet="img/buttons/button-slider-right-desktop.svg"
              media="(min-width: 1024px)"
            />
            <source
              srcSet="img/buttons/button-slider-right-tablet.svg"
              media="(min-width: 576px)"
            />
            <img
              src="img/buttons/button-slider-right-tablet.svg"
              alt="The button slider right"
              title="The button slider right"
              className={`${styles['picturesSlider__button-slider-right']}`}
            />
          </picture>
        </button>
      </div>
    </div>
  );
};
