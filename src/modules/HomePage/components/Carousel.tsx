import { useState, useEffect } from 'react';
import { CarouselIndicator } from './CarouselIndicator';
import styles from './Carousel.module.scss';
import { Link } from 'react-router-dom';

export const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    { image: 'img/phone-banner.webp', link: '/phones' },
    { image: 'img/tablet-banner.webp', link: '/tablets' },
    { image: 'img/headset-banner.webp', link: '/accessories' },
  ];

  const next = () => {
    setActiveIndex(prev => (prev + 1) % slides.length);
    console.log('next slide', new Date());
  };
  const prev = () =>
    setActiveIndex(prev => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [activeIndex]);

  return (
    <section className={styles.carousel}>
      <div className={styles.carousel__body}>
        <button className={styles.carousel__button} onClick={prev}>
          <img src="img/arrow-left.svg" alt="Previous" />
        </button>

        {/* Це наше "вікно" перегляду */}
        <div className={styles.carousel__window}>
          {/* Це стрічка, яка рухається */}
          <div
            className={styles.carousel__list}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <Link
                key={index}
                to={slide.link}
                className={styles.carousel__slide}
              >
                <img
                  className={styles.carousel__image}
                  src={slide.image}
                  alt={`Slide ${index}`}
                />
              </Link>
            ))}
          </div>
        </div>

        <button className={styles.carousel__button} onClick={next}>
          <img src="img/arrow-right.svg" alt="Next" />
        </button>
      </div>
      <CarouselIndicator activeIndex={activeIndex} />
    </section>
  );
};
