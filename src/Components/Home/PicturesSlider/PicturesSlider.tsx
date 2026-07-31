import { useEffect, useState } from 'react';
import './PicturesSlider.scss';
import classNames from 'classnames';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import { Category } from '../Category';
import { Products } from '../../../types/Products';
import { getPhonesFromApi } from '../../../utils/api';

const slides = ['iphone14pro', 'iphone17Pro', 'iPad', 'watch'];

export const PicturesSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [phones, setPhones] = useState<Products[]>([]);

  const changeSlide = (direction: number) => {
    setSlideIndex(currentIndex => {
      return (currentIndex + direction + slides.length) % slides.length;
    });
  };

  useEffect(() => {
    getPhonesFromApi().then(phone => {
      const sortedPhones = [...phone].sort(
        (a, b) => b.priceRegular - a.priceRegular,
      );

      setPhones(sortedPhones);
    });
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      changeSlide(1);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [slideIndex]);

  const currentSlide = slides[slideIndex];

  const newPhones = phones.filter(
    phone =>
      phone.namespaceId.includes('14') ||
      phone.namespaceId.includes('14-pro') ||
      null,
  );

  return (
    <>
      <div className="main">
        <h1>Welcome to Nice Gadgets store!</h1>

        <div className="info">
          <button
            type="button"
            className="info__scroll"
            onClick={() => changeSlide(-1)}
            aria-label="Previous slide"
          >
            <img src={`${import.meta.env.BASE_URL}/img/arrowLeft.svg`} alt="" />
          </button>

          <div className="info__title">
            <img
              key={currentSlide}
              src={`${import.meta.env.BASE_URL}/img/${currentSlide}.jpg`}
              alt={currentSlide}
              className="info__photo"
            />
          </div>

          <button
            type="button"
            className="info__scroll"
            onClick={() => changeSlide(1)}
            aria-label="Next slide"
          >
            <img
              src={`${import.meta.env.BASE_URL}/img/arrowRight.svg`}
              alt=""
            />
          </button>
        </div>

        <div className="bar">
          {slides.map(slide => {
            return (
              <button
                key={slide}
                onClick={() => setSlideIndex(slides.indexOf(slide))}
                className={classNames('bar__title', {
                  'bar__title--active': slideIndex === slides.indexOf(slide),
                })}
              ></button>
            );
          })}
        </div>
      </div>
      <ProductsSlider phones={newPhones} />
      <Category />
      <ProductsSlider phones={phones} isShowDiscount={true} />
    </>
  );
};
