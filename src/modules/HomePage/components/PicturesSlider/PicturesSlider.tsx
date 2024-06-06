import { useContext, useEffect, useState } from 'react';
import './PicturesSlider.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {
  ThemeContext,
  ThemeType,
} from '../../../../contexts/ThemeContext/ThemeContext';
import { getIconSrc } from '../../../../helpers/getIconSrc';

const banners = [
  {
    id: 1,
    src: './img/banners/banner-phones.png',
    title: 'phones',
  },
  {
    id: 2,
    src: './img/banners/banner-tablets.png',
    title: 'tablets',
  },
  {
    id: 3,
    src: './img/banners/banner-accessories.png',
    title: 'accessories',
  },
];

export const PicturesSlider = () => {
  const { theme } = useContext(ThemeContext);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const lastIndex = banners.length;

  const handleNextImage = () => {
    setCurrentImage(prev => (prev + 1) % banners.length);
  };

  const handlePrevImage = () => {
    setCurrentImage(prev => (prev === 0 ? lastIndex - 1 : prev - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextImage();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentImage]);

  return (
    <section className="carousel">
      <button
        className={classNames('carousel__button carousel__button--left', {
          dark: theme === ThemeType.DARK,
        })}
        onClick={handlePrevImage}
      >
        <img src={getIconSrc('arrow-prev', theme)} className="icon" />
      </button>

      <div className="carousel__images">
        {banners.map(({ id, src, title }) => (
          <Link to={`/${title}`} key={id} className="carousel__link">
            <img
              key={id}
              src={src}
              alt={`Slide ${title}`}
              className="carousel__image"
              style={{
                transform: `translateX(-${currentImage * 100}%)`,
              }}
            />
          </Link>
        ))}
      </div>

      <button
        className={classNames('carousel__button carousel__button--right', {
          dark: theme === ThemeType.DARK,
        })}
        onClick={handleNextImage}
      >
        <img src={getIconSrc('arrow-next', theme)} className="icon" />
      </button>

      <div className="carousel__dashes">
        {banners.map((_, index) => (
          <div
            key={index}
            className={classNames('carousel__dash', {
              'carousel__dash--active': currentImage === index,
            })}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </section>
  );
};
