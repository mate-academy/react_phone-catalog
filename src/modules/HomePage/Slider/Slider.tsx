import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './Slider.module.scss';

const slides = [
  {
    id: 1,
    title: 'iPhone 14 Pro',
    description: 'Pro. Beyond',
    img: 'img/assets/homepage/baner_iphone14.png',
  },
  {
    id: 2,
    title: 'iPhone 13 Pro',
    description: 'Pro. Beyond',
    img: 'img/assets/homepage/baner_iphone13.png',
  },
  {
    id: 3,
    title: 'iPhone 12 Pro',
    description: 'Pro. Beyond',
    img: 'img/assets/homepage/baner_iphone12.png',
  },
];

const Slider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const firstSlide = { ...slides[slides.length - 1] };
  const lastSlide = { ...slides[0] };
  const fullSlides = [firstSlide, ...slides, lastSlide];
  const lastSlideNumber = slides.length;
  const goToSlide = (number: number, behavior: ScrollBehavior = 'instant') => {
    if (sliderRef.current) {
      const children = Array.from(sliderRef.current.children);

      if (children.length > 1) {
        children[number].scrollIntoView({ behavior, block: 'center' });
      }
    }
  };

  firstSlide.id = slides[0].id - 1;
  lastSlide.id = slides[slides.length - 1].id + 1;

  useEffect(() => {
    goToSlide(1);
  }, []);

  const handleScroll = () => {
    if (sliderRef.current) {
      const slideWidht = sliderRef.current.clientWidth;
      let num = Math.round(sliderRef.current.scrollLeft / slideWidht);

      if (num === 0) {
        num = lastSlideNumber;
      } else if (num === slides.length + 1) {
        num = 1;
      }

      if (sliderRef.current.scrollLeft === 0) {
        goToSlide(lastSlideNumber);
      }

      if (
        Math.round(
          (sliderRef.current.scrollLeft / (slideWidht * (slides.length + 1))) *
            100,
        ) === 100
      ) {
        goToSlide(1);
      }

      setCurrentSlide(num);
    }
  };

  return (
    <div className={styles['slider-container']}>
      <button
        className={cn(styles['slider-button'], styles['slider-button--left'])}
        onClick={() => goToSlide(currentSlide - 1, 'smooth')}
      ></button>
      <div
        ref={sliderRef}
        className={styles.slider}
        onScrollCapture={handleScroll}
      >
        {fullSlides.map(slide => (
          <div key={slide.id} className={styles.slide}>
            <div className={styles.slide__top}>
              <p className={styles.slide__logo}>
                <span>Now available</span>
                <span>
                  in our store!<span className={styles.slide__logo_ok}></span>
                </span>
              </p>
              <p className={styles.slide__motto}>Be the first</p>
              <button className={styles.slide__order}>Order now</button>
            </div>
            <div className={styles.slide__bottom}>
              <p className={styles.slide__title}>{slide.title}</p>
              <p className={styles.slide__description}>{slide.description}</p>
              <div
                className={styles.slide__photo}
                style={{
                  backgroundImage: `url(${slide.img})`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <button
        className={cn(styles['slider-button'], styles['slider-button--right'])}
        onClick={() => goToSlide(currentSlide + 1, 'smooth')}
      ></button>
      <div className={styles.dots}>
        {slides.map(slide => (
          <div
            key={slide.id}
            className={`${styles.dots__dot} ${slide.id === currentSlide ? styles['dots__dot--active'] : ''}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
