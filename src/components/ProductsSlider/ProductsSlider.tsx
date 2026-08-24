import styles from './productsSlider.module.scss';
import { useSlider } from '../../hooks/useSlider';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductCardType } from '../../types/productCard';

type Props = {
  title: string;
  products: ProductCardType[];
  showFullPrice?: boolean;
};

export const ProductsSlider = ({ title, products }: Props) => {
  const step = 1;
  const frameSize = 4;

  const {
    currentIndex,
    isPrevDisabled,
    isNextDisabled,
    prevButton,
    nextButton,
  } = useSlider({
    itemsLength: products.length,
    step,
    frameSize,
  });

  return (
    <div className={styles.slider}>
      <div className={styles.slider__navigation}>
        <h2 className={styles.slider__title}>{title}</h2>

        <div className={styles.slider__arrows}>
          <button
            onClick={prevButton}
            disabled={isPrevDisabled}
            className={styles.slider__arrows__arrow}
          >
            <img
              className={styles.lightIcon}
              src={
                isPrevDisabled
                  ? `${import.meta.env.BASE_URL}/img/icons/disabled-arrow-left.svg`
                  : `${import.meta.env.BASE_URL}/img/icons/ArrowLeft.svg`
              }
              alt="arrow left"
            />
            <img
              className={styles.darkIcon}
              src={
                isPrevDisabled
                  ? `${import.meta.env.BASE_URL}/img/icons-dark/Disabled-arrow-left.svg`
                  : `${import.meta.env.BASE_URL}/img/icons-dark/Arrow–left.svg`
              }
              alt="arrow left"
            />
          </button>

          <button
            onClick={nextButton}
            disabled={isNextDisabled}
            className={styles.slider__arrows__arrow}
          >
            <img
              className={styles.lightIcon}
              src={
                isNextDisabled
                  ? `${import.meta.env.BASE_URL}/img/icons/disabled-arrow-right.svg`
                  : `${import.meta.env.BASE_URL}/img/icons/ArrowRight.svg`
              }
              alt="arrow right"
            />
            <img
              className={styles.darkIcon}
              src={
                isNextDisabled
                  ? `${import.meta.env.BASE_URL}/img/icons-dark/Disabled-arrow-right.svg`
                  : `${import.meta.env.BASE_URL}/img/icons-dark/Arrow-right.svg`
              }
              alt="arrow right"
            />
          </button>
        </div>
      </div>

      <div className={styles.cards}>
        <div
          className={styles.cards__track}
          style={{
            transform: `translateX(-${currentIndex * (272 + 16)}px)`,
          }}
        >
          {products.map(product => (
            <div key={product.id} className={styles.cards__item}>
              <ProductCard item={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
