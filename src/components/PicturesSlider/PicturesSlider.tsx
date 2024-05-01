import { useEffect, useRef, useState } from 'react';
import './PicturesSlider.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../utils/fetchProducts';

export const PicturesSlider = () => {
  const categories = [
    {
      category: 'phones',
      image: 'img/picturesSlider/iphone.png',
    },
    {
      category: 'tablets',
      image: 'img/picturesSlider/ipad.png',
    },
    {
      category: 'accessories',
      image: 'img/picturesSlider/watch.png',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [frameSize, setFrameSize] = useState(0);
  const lastIndex = categories.length - 1;
  const transformValue = frameSize * currentIndex;
  const banner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (banner.current) {
      setFrameSize(banner.current.offsetWidth);
    }
  }, [currentIndex]);

  const handleLeft = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(lastIndex);
    }
  };

  const handleRight = () => {
    if (currentIndex !== lastIndex) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleRight();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className="carousel">
      <div className="carousel__slider">
        <button className="carousel__slider__button" onClick={handleLeft}>
          <div className="icon icon-left" />
        </button>

        <div className="carousel__slider__container" ref={banner}>
          <ul
            className="carousel__slider-list"
            style={{
              transform: `translateX(${-transformValue}px)`,
            }}
          >
            {categories.map(item => (
              <li className="carousel__slider-item" key={item.category}>
                <Link
                  to={`./${item.category}`}
                  style={{
                    backgroundImage: `url(${BASE_URL}${item.image})`,
                  }}
                  className="carousel__slider-link"
                />
              </li>
            ))}
          </ul>
        </div>

        <button className="carousel__slider__button" onClick={handleRight}>
          <div className="icon icon-right" />
        </button>
      </div>

      <div className="carousel__dots">
        {categories.map((category, index) => (
          <button
            key={category.category}
            type="button"
            aria-label="dots"
            onClick={() => setCurrentIndex(index)}
            className={classNames('carousel__dots-item', {
              'carousel__dots-item-active': currentIndex === index,
            })}
          />
        ))}
      </div>
    </section>
  );
};
