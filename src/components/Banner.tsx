import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Image1 from '../assets/images/top-slider-1.jpg';
import Image2 from '../assets/images/top-slider-2.jpg';
import Image3 from '../assets/images/top-slider-3.png';
import { ReactComponent as LeftArrow }
  from '../assets/images/icons/arrow-left.svg';
import { ReactComponent as RightArrow }
  from '../assets/images/icons/arrow-right.svg';

const images = [Image2, Image1, Image3];

const Banner = () => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const moveSlide = (diraction: string) => {
    if (diraction === 'left') {
      setSliderIndex(sliderIndex > 0 ? sliderIndex - 1 : images.length - 1);
    } else {
      setSliderIndex(sliderIndex < images.length - 1 ? sliderIndex + 1 : 0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => moveSlide('right'), 5000);

    return () => clearInterval(interval);
  }, [sliderIndex]);

  return (
    <section className="page__section slider">
      <div className="slider__b">
        <button
          type="button"
          className="slider__btn"
          onClick={() => moveSlide('left')}
        >
          <LeftArrow />
        </button>
        <div className="slider__slides">
          <div
            className="slider__wrapper"
            style={{
              transform: `translateX(-${sliderIndex * 1040}px)`,
            }}
          >
            {images.map(image => (
              <div key={image} className="slider__img-container">
                <img
                  src={image}
                  alt="img"
                  className="slider__img"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="slider__btn"
          onClick={() => moveSlide('right')}
        >
          <RightArrow />
        </button>
      </div>
      <div className="slider__dots">
        {Array.from({ length: images.length }, (_, i) => i + 1)
          .map((item, index) => (
            <div
              key={item}
              aria-hidden="true"
              className={classNames('slider__dot',
                {
                  'slider__dot--active': index === sliderIndex,
                })}
              onClick={() => setSliderIndex(item - 1)}
            />
          ))}
      </div>
    </section>
  );
};

export default Banner;
