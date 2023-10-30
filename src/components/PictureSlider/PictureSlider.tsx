import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { ICONS } from '../../icons';
import { BASE_URL } from '../../utils/constants';
import './PictureSlider.scss';

type CheckPosition = (
  direction: 'right' | 'left',
  width: number,
) => void;

const BANNERS = [
  {
    id: 1,
    address: `${BASE_URL}/img/banner-accessories.png`,
    title: 'Accessories banner',
  },
  {
    id: 2,
    address: `${BASE_URL}/img/banner-phones.png`,
    title: 'Phones banner',
  },
  {
    id: 3,
    address: `${BASE_URL}/img/banner-tablets.png`,
    title: 'Tablets banner',
  },
];

export const PictureSlider = () => {
  const [scrollImage, setScrollImage] = useState(0);
  const [frameWidth, setFrameWidth] = useState(0);
  const finalPosition = -frameWidth * 2;
  const elementRef = useRef<HTMLDivElement | null>(null);

  const isActiveDot = (slide: number) => {
    return slide === scrollImage;
  };

  const handleScroll: CheckPosition = (direction: string, width: number) => {
    if (direction === 'right') {
      const scrollRight = scrollImage + (-width);

      if (scrollImage === finalPosition) {
        setScrollImage(0);

        return;
      }

      if (scrollRight < finalPosition) {
        setScrollImage(finalPosition);
      } else {
        setScrollImage(scrollRight);
      }
    }

    if (direction === 'left') {
      const scrollLeft = scrollImage + width;

      if (scrollImage === 0) {
        setScrollImage(finalPosition);

        return;
      }

      if (scrollLeft > 0) {
        setScrollImage(0);
      } else {
        setScrollImage(scrollLeft);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (elementRef.current) {
        setFrameWidth(elementRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleScroll('right', frameWidth);
    }, 3000);

    return () => clearInterval(interval);
  }, [scrollImage, frameWidth]);

  const styles = {
    carouselList: {
      width: frameWidth * 3,
      transition: 'transform 1000ms ease-in-out',
      transform: `translateX(${scrollImage}px)`,
    },
  };

  return (
    <section className="picture-slider">
      <div className="slider slider-container">
        <button
          type="button"
          className="slider-btn page-btns"
          onClick={() => handleScroll('left', frameWidth)}
        >
          <img src={ICONS.arrowLeft} alt="Button left" />
        </button>
        <div className="images images-container" ref={elementRef}>
          <ul className="images_list" style={styles.carouselList}>
            {BANNERS.map(banner => (
              <li className="images_item" key={banner.id}>
                <img
                  className="image"
                  src={banner.address}
                  alt={banner.title}
                />
              </li>
            ))}

          </ul>
        </div>
        <button
          type="button"
          className="slider-btn page-btns"
          onClick={() => handleScroll('right', frameWidth)}
        >
          <img src={ICONS.arrowRignt} alt="Button right" />
        </button>
      </div>
      <ul className="dots">
        <li className="dot-container">
          <div className={cn('dot', {
            'dot--active': isActiveDot(0),
          })}
          />
        </li>
        <li className="dot-container">
          <div className={cn('dot', {
            'dot--active': isActiveDot(-frameWidth),
          })}
          />
        </li>
        <li className="dot-container">
          <div className={cn('dot', {
            'dot--active': isActiveDot(finalPosition),
          })}
          />
        </li>
      </ul>
    </section>
  );
};
