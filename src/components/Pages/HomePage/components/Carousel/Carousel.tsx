import Slider from 'react-slick';
import styles from './Carousel.module.scss';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useContext, useRef, useState } from 'react';
// eslint-disable-next-line max-len, import/extensions
import classNames from 'classnames';
import { CustomNextArrow, CustomPrevArrow } from '../CustomArrows/CustomArrows';
import { GlobalContext } from '../../../../shared/GlobalContext/GlobalContext';

const images = [
  'img/homePage/banner-1.png',
  'img/homePage/banner-2.png',
  'img/homePage/banner-3.png',
];

export const Carousel = () => {
  const slider = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isSunSelected } = useContext(GlobalContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,

    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,

    swipeToSlide: true,
    cssEase: 'ease-in-out',
    arrows: true,
    appendDots: (dots: React.ReactNode) => (
      <div className={styles.customDotsContainer}>
        <ul className={styles.customDotsList}>{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        className={
          isSunSelected
            ? `${styles.dots} ${currentSlide === i ? styles.active : ''}`
            : `${styles.dots} ${currentSlide === i ? styles.active_dark : ''}`
        }
        onClick={() => slider.current?.slickGoTo(i)}
      />
    ),
    afterChange: (current: number) => {
      setCurrentSlide(current);
    },
  };

  return (
    <section className={styles.carousel}>
      <h2
        className={classNames(styles.carousel__title, {
          [styles['carousel__title-dark']]: !isSunSelected,
        })}
      >
        Welcome to Nice Gadgets store!
      </h2>

      <Slider {...settings} className={styles.carousel__banner} ref={slider}>
        {images.map((img, index) => (
          <Link
            key={index}
            to={
              index === 0 ? 'accessories' : index === 1 ? 'phones' : 'tablets'
            }
            className={classNames(styles.carousel__banner_link, {
              [styles['carousel__banner_link-dark']]: !isSunSelected,
            })}
          >
            {index === 0 && (
              <>
                <h3 className={styles.carousel__banner_title}>
                  Accessorize Your Experience
                </h3>
                <p className={styles.carousel__banner_text}>
                  Find the perfect accessories to complement your devices. From
                  cases to chargers, we have everything you need.
                </p>
              </>
            )}
            {index === 1 && (
              <>
                <h3 className={styles.carousel__banner_title}>
                  Discover the Latest Models
                </h3>
                <p className={styles.carousel__banner_text}>
                  Explore the neweset collection of phones with cutting-edge
                  technology and sleek designs. Available now in various colors
                </p>
              </>
            )}
            {index === 2 && (
              <>
                <h3 className={styles.carousel__banner_title}>
                  Unleash Your Creativity
                </h3>
                <p className={styles.carousel__banner_text}>
                  Get the latest tablets designed for both work and play. Enjoy
                  seamless performance and stunning displays
                </p>
              </>
            )}
            <img
              src={img}
              alt={`slide-${index}`}
              className={classNames(styles.carousel__banner_img, {
                [styles[`image_${index}`]]: true,
              })}
            />
          </Link>
        ))}
      </Slider>
    </section>
  );
};
