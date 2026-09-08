/* eslint-disable @typescript-eslint/indent */

import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsSlider.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useRef, useState } from 'react';
import classNames from 'classnames';
type Props = {
  products: Product[];
  hasDiscount: boolean;
  title: string;
};

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  swipe: true,
  variableWidth: true,
  adaptiveHeight: true,
  rows: 1,

  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },

    {
      breakpoint: 320,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  hasDiscount,
  title,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(products.length / settings.slidesToScroll);

  const sortedProducts = !hasDiscount
    ? products.sort((p1, p2) => p2.year - p1.year)
    : products.sort(
        (p1, p2) => p2.fullPrice - p2.price - (p1.fullPrice - p1.price),
      );
  const sliderRef = useRef<Slider>(null);

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className={styles.ProductsSlider}>
      <div className={styles.ProductsSlider__header}>
        <h2 className={styles.ProductsSlider__title}>{title}</h2>
        <div className={styles.ProductsSlider__buttons}>
          <button
            className={classNames(styles.ProductsSlider__button, {
              [styles['ProductsSlider__button--disabled']]: currentSlide === 0,
            })}
            onClick={() => handlePrev()}
          >
            <img
              src={`./img/buttons/left-arrow${currentSlide === 0 ? '-disabled' : ''}.svg`}
              alt="arrow-left"
            />
          </button>
          <button
            className={classNames(styles.ProductsSlider__button, {
              [styles['ProductsSlider__button--disabled']]:
                currentSlide === totalSlides,
            })}
            onClick={() => handleNext()}
          >
            <img
              src={`./img/buttons/right-arrow${currentSlide === totalSlides ? '-disabled' : ''}.svg`}
              alt="arrow-right"
            />
          </button>
        </div>
      </div>

      <div className={styles.ProductsSlider__viewport}>
        <section className={styles.ProductsSlider__content}>
          <Slider
            {...settings}
            ref={sliderRef}
            key={products.length}
            beforeChange={(oldIndex, newIndex) => setCurrentSlide(newIndex)}
          >
            {sortedProducts.map(product => (
              <div
                className={styles.ProductsSlider__content_item}
                key={product.id}
              >
                <ProductCard
                  isSlider={true}
                  product={product}
                  discount={hasDiscount}
                />
              </div>
            ))}
          </Slider>
        </section>
      </div>
    </div>
  );
};
/* eslint-enable @typescript-eslint/indent */
