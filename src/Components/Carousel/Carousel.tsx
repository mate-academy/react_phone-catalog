import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Product } from '../../Types/Product';
import './Carousel.scss';

import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  products: Product[],
  title: string,
};

export const Carousel: React.FC<Props> = ({ products, title }) => {
  /* eslint-disable no-return-assign, no-param-reassign */
  const [slideWidth, setSlideWidth] = useState(0);
  const [offset, setOffset] = useState(0);
  const [screenWidth] = useState(window.innerWidth);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);
  const [sliceNum, setSliceNum] = useState(0);

  useEffect(() => {
    if (window.innerWidth > 400) {
      setSliceNum(1);
    } else {
      setSliceNum(2);
    }
  }, [window.innerWidth]);

  const max = ((slideWidth * 34) / itemsPerSlide);
  const min = 0;

  const setScreenWidth = () => {
    if (screenWidth < 420) {
      setSlideWidth(205);
    } else if (screenWidth >= 420 && screenWidth < 1200) {
      setItemsPerSlide(2);
      setSlideWidth(410);
    } else {
      setSlideWidth(820);
      setItemsPerSlide(4);
    }
  };

  useEffect(() => {
    setScreenWidth();
  }, [screenWidth]);

  const onNext = () => {
    setOffset((current) => (
      Math.min(current += slideWidth, max)
    ));
  };

  const onPrev = () => {
    setOffset((current) => (
      Math.max(current -= slideWidth, 0)
    ));
  };

  return (
    <section className="carousel">
      <div className="carousel__top">
        <h1 className="carousel__title">{title}</h1>
        <div className="carousel__buttons">
          <button
            type="button"
            onClick={onPrev}
            className={classNames(
              'carousel__button',
              { 'carousel__button--active': offset === min },
            )}
          >
            <img src="Images/arrow-icon--left.svg" alt="Arrow icon left" />
          </button>

          <button
            type="button"
            onClick={onNext}
            className={classNames(
              'carousel__button',
              { 'carousel__button--active': offset === max },
            )}
          >
            <img
              src="Images/arrow-icon--left.svg"
              alt="Arrow icon right"
              style={{ transform: 'rotate(180deg)' }}
            />
          </button>
        </div>
      </div>

      <div className="carousel__container" data-cy="cardsContainer">
        {products.length ? (
          <div
            className="carousel__items"
            style={{ transform: `translateX(-${offset}px)`, transition: '2s' }}
          >
            {products.slice(sliceNum).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="carousel__failed">Failed data</div>
        )}
      </div>
    </section>
  );
};
