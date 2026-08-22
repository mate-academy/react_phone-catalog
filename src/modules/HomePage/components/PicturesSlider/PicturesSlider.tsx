import { Link } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '../../../shared/components/Icon';
import { getImageUrl } from '../../../../utils/getImageUrl';
import styles from './PicturesSlider.module.scss';

type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  cta: string;
  caption: string;
  captionSub: string;
  image: string;
  link: string;
};

const SLIDES: Slide[] = [
  {
    id: 'phones',
    eyebrow: 'Now available in our store!',
    title: 'The lineup that\u2019s worth the upgrade',
    cta: 'Shop phones',
    caption: 'New phones',
    captionSub: 'Beyond ordinary.',
    image: 'img/banner-phones.png',
    link: '/phones',
  },
  {
    id: 'tablets',
    eyebrow: 'Work anywhere',
    title: 'Tablets built for your whole day',
    cta: 'Shop tablets',
    caption: 'New tablets',
    captionSub: 'Room to work.',
    image: 'img/banner-tablets.png',
    link: '/tablets',
  },
  {
    id: 'accessories',
    eyebrow: 'Finishing touches',
    title: 'Accessories that complete the set',
    cta: 'Shop accessories',
    caption: 'New accessories',
    captionSub: 'Small extras, big difference.',
    image: 'img/banner-accessories.png',
    link: '/accessories',
  },
];

const INTERVAL = 5000;

export const PicturesSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    timerRef.current = window.setTimeout(() => {
      goTo(current + 1);
    }, INTERVAL);

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [current, goTo]);

  return (
    <section className={styles.slider}>
      <button
        type="button"
        aria-label="Previous slide"
        className={styles.slider__nav}
        onClick={() => goTo(current - 1)}
      >
        <Icon name="chevron-left" />
      </button>

      <div className={styles.slider__viewport}>
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={styles.slider__slide}
            style={{ transform: `translateX(${(index - current) * 100}%)` }}
          >
            <div className={styles.slider__content}>
              <p className={styles.slider__eyebrow}>{slide.eyebrow}</p>
              <h2 className={styles.slider__title}>{slide.title}</h2>
              <Link to={slide.link} className={styles.slider__cta}>
                {slide.cta}
              </Link>
            </div>

            <Link to={slide.link} className={styles.slider__imageLink}>
              <div className={styles.slider__caption}>
                <p className={styles.slider__captionTitle}>{slide.caption}</p>
                <p className={styles.slider__captionSub}>{slide.captionSub}</p>
              </div>

              <img
                className={styles.slider__image}
                src={getImageUrl(slide.image)}
                alt=""
              />
            </Link>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Next slide"
        className={styles.slider__nav}
        onClick={() => goTo(current + 1)}
      >
        <Icon name="chevron-right" />
      </button>

      <div className={styles.slider__dashes}>
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            className={`${styles.slider__dash} ${
              index === current ? styles['slider__dash--active'] : ''
            }`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  );
};
