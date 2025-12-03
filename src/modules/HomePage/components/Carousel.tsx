import { useState } from 'react';
import { CarouselIndicator } from './CarouselIndicator';
import styles from './Carousel.module.scss';
import { Link } from 'react-router-dom';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0); // This would typically be stateful to reflect the current slide
  const slides = [
    {
      image: 'img/phone-banner.webp',
      link: '/phones',
    },
    {
      image: 'img/tablet-banner.webp',
      link: '/tablets',
    },
      {
      image: 'img/headset-banner.webp',
      link: '/accessories',
    },
  
  ];
  const next = () => setActiveIndex(prev => (prev + 1) % slides.length);
  const prev = () =>
    setActiveIndex(prev => (prev - 1 + slides.length) % slides.length);

  return (
    <>
      <section className={styles.carousel}>
        <div className={styles.carousel__body}>
          <button className={styles.carousel__button} onClick={prev}>
            <img src="img/arrow-left.svg" alt="Previous" />
          </button>
          <Link
            to={slides[activeIndex].link}
            className={styles.carousel__imageContainer}
          >
            <img
              className={styles.carousel__image}
              src={slides[activeIndex].image}
              alt="Carousel Slide"
            />
          </Link>
          <button className={styles.carousel__button} onClick={next}>
            <img src="img/arrow-right.svg" alt="Next" />
          </button>
        </div>
        <CarouselIndicator activeIndex={activeIndex} />
      </section>
    </>
  );
};

export default Carousel;
