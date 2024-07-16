import Slider from 'react-slick';
import styles from './HomePage.module.scss';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef, useState } from 'react';
// import classNames from 'classnames';
// import { dark } from '@mui/material/styles/createPalette';

const images = [
  'img/homePage/banner-1.png',
  'img/homePage/banner-2.png',
  'img/homePage/banner-3.png',
];

interface ArrowProps {
  className?: string;
  onClick?: () => void;
}

const SampleNextArrow: React.FC<ArrowProps> = props => {
  const { className, onClick } = props;

  return (
    <div className={`${className} ${styles.nextArrow}`} onClick={onClick} />
  );
};

const SamplePrevArrow: React.FC<ArrowProps> = props => {
  const { className, onClick } = props;

  return (
    <div className={`${className} ${styles.prevArrow}`} onClick={onClick} />
  );
};

export const HomePage = () => {
  const slider = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    swipeToSlide: true, // Дозволяє безпосередню зміну слайдів при перетягуванні
    cssEase: 'ease-out', // Плавна анімація
    arrows: true,
    appendDots: (dots: React.ReactNode) => (
      <div className={styles.customDotsContainer}>
        <ul className={styles.customDotsList}>{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        className={`${styles.dots} ${currentSlide === i ? styles.active : ''}`}
        onClick={() => slider.current?.slickGoTo(i)}
      />
    ),
    afterChange: (current: number) => {
      setCurrentSlide(current);
    },
  };

  return (
    <div className="Home">
      <h1 hidden>Product Catalog</h1>

      <section className={styles.carousel}>
        <h2 className={styles.carousel__title}>
          Welcome to Nice Gadgets store!
        </h2>

        <Slider {...settings} className={styles.carousel__banner} ref={slider}>
          {images.map((img, index) => (
            <Link key={index} to={''} className={styles.carousel__banner_link}>
              <img
                src={img}
                alt={`slide-${index}`}
                className={styles.carousel__banner_img}
              />
            </Link>
          ))}
        </Slider>
      </section>
    </div>
  );
};
