import { Link } from 'react-router-dom';
import styles from './PicturesSlider.module.scss';
import { useEffect, useState } from 'react';
export const PicturesSlider = () => {
  const slides = [
    {
      title: 'Now available in our store!',
      subtitle: 'Be the first!',
      productTitle: 'iPhone 14 Pro',
      productSubtitle: 'Pro. Beyond.',
      image: '/img/banner/iphone-14-pro.png',
      link: '/product/apple-iphone-14-pro',
    },

    {
      title: 'New Samsung Galaxy',
      subtitle: 'Check it out!',
      productTitle: 'Galaxy S24 Ultra',
      productSubtitle: 'Galaxy AI is here.',
      image: '/img/banner/s24-ultra.png',
      link: '/product/samsung-s24-ultra',
    },

    {
      title: 'Meet the future',
      subtitle: 'Available now',
      productTitle: 'Google Pixel 9',
      productSubtitle: 'The best of Google.',
      image: '/img/banner/pixel-9.png',
      link: '/product/google-pixel-9',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(intervalId);
  }, [slides.length]);
  const slide = slides[currentSlide];
  const handlePrev = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.hero}>
      <h1 className={styles['pictures-slider__title']}>
        Welcome to Nice <br className={styles['mobile-break']} /> Gadgets store!
      </h1>
      <div className={styles['pictures-slider']}>
        <button
          className={`${styles.slider__arrow} ${styles['slider__arrow--left']}`}
          onClick={handlePrev}
        >
          {' '}
          <img src={`${import.meta.env.BASE_URL}/img/buttons/arrow-left.png`} />
        </button>
        <Link
          to="/product/apple-iphone-14-pro"
          className={styles['pictures-slider__banner']}
        >
          <div className={styles.banner__content}>
            <h2 className={styles.banner__title}>
              {slide.title}
              <span className={styles.banner__icon}>👌</span>
            </h2>
            <p className={styles.banner__subtitle}>{slide.subtitle}</p>

            <button className={styles.banner__button}>Order now</button>
          </div>
          <div className={styles.banner__product}>
            <h3 className={styles['banner__product-title']}>
              {slide.productTitle}
            </h3>
            <p className={styles['banner__product-tagline']}>
              {slide.productSubtitle}
            </p>
            <div className={styles['banner__product-image']}>
              <img
                src={`${import.meta.env.BASE_URL}/${slide.image.startsWith('/') ? slide.image.slice(1) : slide.image}`}
              />
            </div>
          </div>
        </Link>

        <button
          className={`${styles.slider__arrow} ${styles['slider__arrow--right']}`}
          onClick={handleNext}
        >
          {' '}
          <img
            src={`${import.meta.env.BASE_URL}/img/buttons/arrow-right.png`}
          />
        </button>
      </div>
      <div className={styles.slider__dots}>
        <button
          onClick={() => setCurrentSlide(0)}
          className={`${styles.slider__dot}
                  ${currentSlide === 0 ? styles['slider__dot--active'] : ''}`}
        ></button>
        <button
          onClick={() => setCurrentSlide(1)}
          className={`${styles.slider__dot}
                  ${currentSlide === 1 ? styles['slider__dot--active'] : ''}`}
        ></button>
        <button
          onClick={() => setCurrentSlide(2)}
          className={`${styles.slider__dot}
                  ${currentSlide === 2 ? styles['slider__dot--active'] : ''}`}
        ></button>
      </div>
    </div>
  );
};
