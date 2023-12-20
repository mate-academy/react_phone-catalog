import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from 'react';
import cn from 'classnames';
import './Carousel.scss';
import phones from '../../assets/banner-phones.png';
import tablets from '../../assets/banner-tablets.png';
import accessories from '../../assets/banner-accessories.png';

const images = [
  phones,
  tablets,
  accessories,
];

export const Carousel: React.FC = () => {
  const firstImageIndex = 0;
  const lastImageIndex = images.length - 1;

  const [currentImageIndex, setCurrentImageIndex] = useState(firstImageIndex);
  const [sliderWidth, setSliderWidth] = useState(0);
  const banner = useRef<HTMLDivElement>(null);
  const transformValue = sliderWidth * currentImageIndex;

  useLayoutEffect(() => {
    if (banner.current) {
      setSliderWidth(banner.current.offsetWidth);
    }
  }, [currentImageIndex]);

  const handleLeftSlide = () => {
    if (currentImageIndex !== firstImageIndex) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(lastImageIndex);
    }
  };

  const handleRightSlide = () => {
    if (currentImageIndex !== lastImageIndex) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(firstImageIndex);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      handleRightSlide();
    }, 5000);

    return () => clearInterval(timerId);
  }, [currentImageIndex]);

  return (
    <section className="Carousel">
      <div className="Carousel__slider">
        <button
          aria-label="Move to previous slide"
          type="button"
          className="Carousel__slider-button"
          onClick={handleLeftSlide}
        >
          <div className="icon icon--left" />
        </button>

        <div className="Carousel__slider-container" ref={banner}>
          <ul
            className="Carousel__slider-list"
            style={{
              transform: `translateX(${-transformValue}px)`,
            }}
          >
            {images.map(image => (
              <li key={image} className="Carousel__slider-item">
                <img
                  src={image}
                  alt="Banner"
                  className="Carousel__slider-image"
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          aria-label="Move to next slide"
          type="button"
          className="Carousel__slider-button"
          onClick={handleRightSlide}
        >
          <div className="icon icon--right" />
        </button>
      </div>

      <div className="Carousel__position">
        {images.map((image, i) => (
          <button
            type="button"
            aria-label="position"
            key={image}
            className={cn('Carousel__position-item', {
              'banner-active': currentImageIndex === i,
            })}
            onClick={() => setCurrentImageIndex(i)}
          />
        ))}
      </div>
    </section>
  );
};
