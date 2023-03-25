import './productsSlider.scss';
import { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { ProductCard } from '../ProductCard';

import { Product } from '../../type/product';

type Props = {
  title: string,
  products: Product[];
  isLoading: boolean,
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  isLoading,
}) => {
  const [currentPositionSlider, setCurrentPositionSlider] = useState(0);

  const onHandleMoveSlider = (action: 'prev' | 'next') => {
    const cardWidth = 272;
    const marginRight = 16;
    const numbersOnPage = 4;
    const carouselWidth = (cardWidth + marginRight);
    const carouselList = products;
    const bannerLength = carouselList.length;

    switch (action) {
      case 'prev':
        if (currentPositionSlider === 0) {
          setCurrentPositionSlider(
            -carouselWidth * (bannerLength - numbersOnPage),
          );
          break;
        }

        if (currentPositionSlider + carouselWidth * numbersOnPage
          > 0) {
          setCurrentPositionSlider(0);
          break;
        }

        setCurrentPositionSlider(
          (prev) => prev + carouselWidth * numbersOnPage,
        );
        break;

      case 'next':
        if (currentPositionSlider === (
          -carouselWidth * (bannerLength - numbersOnPage)
        )) {
          setCurrentPositionSlider(0);
          break;
        }

        if (currentPositionSlider - carouselWidth * numbersOnPage
          < -carouselWidth * (bannerLength - numbersOnPage)) {
          setCurrentPositionSlider(
            -carouselWidth * (bannerLength - numbersOnPage),
          );
          break;
        }

        setCurrentPositionSlider((prev) => prev - carouselWidth * 4);
        break;

      default:
        setCurrentPositionSlider(0);
    }
  };

  useEffect(() => {
    const timeSlide = setTimeout(() => {
      onHandleMoveSlider('next');
    }, 5000);

    return () => clearTimeout(timeSlide);
  }, [products, currentPositionSlider]);

  return (
    <article className="products-slider">
      {!isLoading ? (
        <>
          <div className="products-slider__head">
            <h2 className="products-slider__title">
              {title}
            </h2>

            <button
              className="products-slider__button products-slider__button--prev"
              type="button"
              aria-label="prev"
              onClick={() => onHandleMoveSlider('prev')}
            />

            <button
              className="products-slider__button products-slider__button--next"
              type="button"
              aria-label="next"
              onClick={() => onHandleMoveSlider('next')}
            />
          </div>

          <div
            className="products-slider__carousel"
            style={{ transform: `translateX(${currentPositionSlider}px)` }}
          >
            {products.map((product) => (
              <ProductCard key={`${product.id}`} product={product} />
            ))}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </article>
  );
};
