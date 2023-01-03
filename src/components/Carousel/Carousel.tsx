import classNames from 'classnames';
import { useContext, useState, useEffect } from 'react';
import { carouselImages } from '../../helpers/data/carousel';
import { WidthContext } from '../context/WidthContext';

export const Carousel = () => {
  const width = useContext(WidthContext);
  const [translateX, setTranslateX] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const [isAutoSlide, setIsAutoSlide] = useState(true);

  const imgWidth = width >= 1140 ? 1040 : width - 66;
  const imgCount = carouselImages.length - 1;
  const maxWidth = imgCount * imgWidth;

  const nextClick = () => {
    setTranslateX(Math.max(translateX - imgWidth, -maxWidth));
    setActiveImg(activeImg === imgCount ? 0 : activeImg + 1);

    if (translateX === -maxWidth) {
      setTranslateX(0);
    }
  };

  const prevClick = () => {
    setTranslateX(Math.min(translateX + imgWidth, 0));
    setActiveImg(activeImg === 0 ? imgCount : activeImg - 1);

    if (translateX === 0) {
      setTranslateX(-maxWidth);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isAutoSlide) {
        nextClick();
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [translateX]);

  return (
    <>
      <section className="carousel">
        <button
          className="carousel__button"
          type="button"
          onClick={() => {
            setIsAutoSlide(false);
            prevClick();
          }}
        >
          {'<'}
        </button>

        <div className="carousel__content">
          {carouselImages.map((image) => (
            <img
              key={image.alt}
              width={imgWidth}
              className="carousel__images"
              src={image.pic}
              alt={image.alt}
              style={{ transform: `translateX(${translateX}px)` }}
            />
          ))}
        </div>

        <button
          className="carousel__button"
          type="button"
          onClick={() => {
            setIsAutoSlide(false);
            nextClick();
          }}
        >
          {'>'}
        </button>
      </section>

      <div className="carousel__dots">
        {carouselImages.map((dot, index) => (
          <div
            key={dot.pic}
            className={classNames('carousel__dots__item', {
              'carousel__dots__item-isActive': activeImg === index,
            })}
          />
        ))}
      </div>
    </>
  );
};
