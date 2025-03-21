/* eslint-disable import/no-extraneous-dependencies */
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ProductsSlider.module.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import Slider from 'react-slick';
import { useRef, useState } from 'react';

type Props = {
  title: string;
  visibleProducts: Product[];
};

export const ProductsSlider: React.FC<Props> = ({ title, visibleProducts }) => {
  const [currSlide, setCurrSlide] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  const isHotPriceBlock = title === 'Hot prices';

  const settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    ref: sliderRef,
    infinite: false,
    beforeChange: (_current: number, next: number) => {
      setCurrSlide(next);
    },
    className: 'slider__wrapper',
  };

  const isPrevBtnDisabled = currSlide === 0;
  const isNextBtnDisabled = currSlide === 6;

  return (
    <div className={styles.slider}>
      <div className={styles.slider__header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.slider__buttons}>
          <button
            className={`${styles.slider__arrowLeft} ${isPrevBtnDisabled && styles.disabled}`}
            onClick={() => sliderRef.current?.slickPrev()}
            disabled={isPrevBtnDisabled}
          >
            <img
              src={`/public/img/icons/arrow-left-icon${isPrevBtnDisabled ? '-dis' : ''}.svg`}
              alt="Previous"
            />
          </button>
          <button
            className={`${styles.slider__arrowRight} ${isNextBtnDisabled && styles.disabled}`}
            onClick={() => sliderRef.current?.slickNext()}
            disabled={isNextBtnDisabled}
          >
            <img
              src={`/public/img/icons/arrow-right-icon${isNextBtnDisabled ? '-dis' : ''}.svg`}
              alt="Next"
            />
          </button>
        </div>
      </div>
      <Slider {...settings}>
        {visibleProducts.map(product => {
          return <ProductCard product={product} isHotPriceBlock={isHotPriceBlock} />;
        })}
      </Slider>
    </div>
  );
};
