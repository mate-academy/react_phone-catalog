import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './PicturesSlider.scss';
import icon_ok from '../../assets/icons/icon-ok.svg';
import classNames from 'classnames';
import { Product } from '../../types/Product';

type Props = {
  latestProducts: Product[];
};

export const PicturesSlider: React.FC<Props> = ({ latestProducts }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev =>
      prev === 0 ? latestProducts.length - 1 : prev - 1,
    );
  }, [latestProducts.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev =>
      prev === latestProducts.length - 1 ? 0 : prev + 1,
    );
  }, [latestProducts.length]);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  }, [nextSlide]);

  useEffect(() => {
    resetInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetInterval]);

  const handleDotClick = (dot: number) => {
    setCurrentSlide(dot);
    resetInterval();
  };

  return (
    <section className="pictures-slider">
      <div className="pictures-slider__container">
        <div
          className="pictures-slider__button pictures-slider__button--left"
          onClick={prevSlide}
        />
        <div className="pictures-slider__content">
          <div className="pictures-slider__aside">
            <div className="picture-slider__wrapper">
              <div className="pictures-slider__title">Now available</div>
              <div className="pictures-slider__title">in our store!</div>
              <img
                src={icon_ok}
                className="pictures-slider__icon-ok"
                alt="icon-ok"
              />
              <p className="pictures-slider__subtitle">Be the first</p>
              <p className="pictures-slider__product-name">
                {latestProducts[currentSlide].name}
              </p>
            </div>
            <a href="#" className="pictures-slider__order-button">
              order now
            </a>
          </div>
          <div className="pictures-slider__photo">
            {latestProducts.map((product, index) => (
              <img
                key={product.id}
                src={product.image}
                alt="slider-product"
                className={classNames(
                  'pictures-slider__img',
                  currentSlide === index
                    ? 'pictures-slider__img--active'
                    : '',
                )}
              />
            ))}
          </div>
        </div>
        <div
          className="pictures-slider__button pictures-slider__button--right"
          onClick={nextSlide}
        />
      </div>
      <div className="pictures-slider__dots">
        <ul className="dots__list">
          {latestProducts.map((product, index) => (
            <li
              key={product.id}
              className={classNames(
                'dots__item',
                currentSlide === index ? 'dots__item--active' : '',
              )}
              onClick={() => handleDotClick(index)}
            ></li>
          ))}
        </ul>
      </div>
    </section>
  );
};
