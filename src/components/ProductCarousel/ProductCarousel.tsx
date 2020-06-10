import React, { useState } from 'react';
import CN from 'classnames';
import { ProductCard } from '../ProductPage/ProductCard';
import './styleProductCarousel.scss';
import '../ProductPage/ProductsPage.scss';

type Props = {
  title: string;
  products: ProductItem[];
  wigthSlides: number;
};
export const ProductCarousel: React.FC<Props> = ({ products, title, wigthSlides }) => {
  const [imgPosition, setImgPosition] = useState<number>(0);
  const carouselLength = products.length;
  const countSlide = carouselLength / 4;
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [stateNexttBtn, setStateNextBtn] = useState<boolean>(true);
  const [statePrevBtn, setStatePrevBtn] = useState<boolean>(false);

  const handleNextSlide = () => {
    if (currentSlide < countSlide - 1) {
      setImgPosition(imgPosition + wigthSlides);
      setCurrentSlide(currentSlide + 1);
      setStatePrevBtn(true);
    }

    if (currentSlide === countSlide - 2) {
      setStateNextBtn(false);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setImgPosition(imgPosition - wigthSlides);
      setCurrentSlide(currentSlide - 1);
      setStateNextBtn(true);
    }

    if (currentSlide - 1 === 0) {
      setStatePrevBtn(false);
    }
  };

  return (
    <>
      <section className="ProductCarousel">
        <div className="container">
          <div className="ProductCarousel__nav">
            <p className="ProductCarousel__title">{title}</p>
            <div className="ProductCarousel__buttons">
              <button
                type="button"
                className={CN({
                  lift__button: true,
                  disabledBtn: !statePrevBtn,
                })}
                disabled={!statePrevBtn}
                onClick={() => handlePrevSlide()}
              >
                <img className="slide__buttonImg" src="./img/Icons/arrows/left.svg" alt="up arrow" />
              </button>
              <button
                type="button"
                className={CN({
                  lift__button: true,
                  disabledBtn: !stateNexttBtn,
                })}
                disabled={!stateNexttBtn}
                onClick={() => handleNextSlide()}
              >
                <img className="slide__buttonImg" src="./img/Icons/arrows/right.svg" alt="up arrow" />
              </button>
            </div>
          </div>
          <div className="ProductCarousel__container">
            <div className="ProductCarousel__list" style={{ transform: `translateX(${imgPosition}%)` }}>
              {products.map(product => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
