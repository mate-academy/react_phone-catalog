import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import classNames from 'classnames';
import './Slider.scss';
import { Link } from 'react-router-dom';
import phones from '../../images/banner-phones.png';
import tablets from '../../images/banner-tablets.png';
import accessories from '../../images/banner-accessories.png';
import arrowLeft from '../../images/arrow-left.svg';
import arrowRight from '../../images/arrow-right.svg';

const images = [
  phones,
  tablets,
  accessories,
];

const IMAGE_WIDTH = 1040;

export const Slider: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string>(images[0]);
  const [currentWidth, setCurrentWidth] = useState<number>(0);

  const handleNext = useCallback(() => {
    const index = images.findIndex(image => image === currentImage);

    if (images.length - 1 === index) {
      setCurrentImage(images[0]);
      setCurrentWidth(0);
    } else {
      setCurrentImage(images[index + 1]);
      setCurrentWidth(currentWidth + IMAGE_WIDTH);
    }
  }, [currentImage, currentWidth]);

  const handlePrev = useCallback(() => {
    const index = images.findIndex(image => image === currentImage);

    if (index === 0) {
      setCurrentImage(images[images.length - 1]);
      setCurrentWidth((images.length - 1) * IMAGE_WIDTH);
    } else {
      setCurrentImage(images[index - 1]);
      setCurrentWidth(currentWidth - IMAGE_WIDTH);
    }
  }, [currentImage, currentWidth]);

  const handleClick = (i: number) => {
    setCurrentImage(images[i]);
    setCurrentWidth(i * IMAGE_WIDTH);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);

    return () => clearInterval(interval);
  }, [currentImage, currentWidth, handleNext]);

  return (
    <div className="slider">
      <div className="slider__wrapper">
        <button
          type="button"
          className="slider__btn slider__btn-prev"
          onClick={handlePrev}
        >
          <img src={arrowLeft} alt="arrow" />
        </button>

        <div className="slider__image-wrapper">
          {images.map(image => {
            const link = image.split('-')[1].split('.')[0];

            return (
              <div
                key={image}
                style={{
                  transform: `translateX(-${currentWidth}px)`,
                  transition: 'transform 1.5s',
                }}
              >
                <Link to={`/${link}`}>
                  <img
                    src={image}
                    alt={image}
                    className="slider__image"
                  />
                </Link>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="slider__btn slider__btn-next"
          onClick={handleNext}
        >
          <img src={arrowRight} alt="arrow" />
        </button>
      </div>

      <div className="slider__dots">
        {images.map((image, i) => (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            key={image}
            type="button"
            className={classNames(
              'slider__button',
              { 'slider__button-active': currentImage === image },
            )}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>
    </div>
  );
};
