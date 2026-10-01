import { useEffect, useState } from 'react';

import { getAssetUrl } from '../../../../shared/asset';

import styles from './PicturesSlider.module.scss';

type Props = {
  navigate: (to: string) => void;
};

const slides = [
  {
    image: '/img/banner-phones.png',
    title: 'Phones made for everyday life',
    description:
      'Discover smartphones with great displays, powerful cameras ' +
      'and reliable performance.',
    path: '/phones',
  },
  {
    image: '/img/banner-tablets.png',
    title: 'Powerful tablets for every task',
    description:
      'Find the right tablet for studying, working, watching videos ' +
      'and staying connected.',
    path: '/tablets',
  },
  {
    image: '/img/banner-accessories.png',
    title: 'Accessories to complete your setup',
    description: 'Explore accessories designed to make everyday life easier.',
    path: '/accessories',
  },
];

export default function PicturesSlider({ navigate }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive(current => (current === slides.length - 1 ? 0 : current + 1));
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[active];

  const previousSlide = () => {
    setActive(current => (current === 0 ? slides.length - 1 : current - 1));
  };

  const nextSlide = () => {
    setActive(current => (current === slides.length - 1 ? 0 : current + 1));
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.slider}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>NOW AVAILABLE IN OUR STORE</span>

          <h2>{slide.title}</h2>

          <p>{slide.description}</p>

          <button type="button" onClick={() => navigate(slide.path)}>
            Shop now
          </button>
        </div>

        <div className={styles.imageWrapper}>
          <img src={getAssetUrl(slide.image)} alt={slide.title} />
        </div>

        <button
          className={`${styles.arrow} ${styles.previous}`}
          type="button"
          aria-label="Previous slide"
          onClick={previousSlide}
        >
          ←
        </button>

        <button
          className={`${styles.arrow} ${styles.next}`}
          type="button"
          aria-label="Next slide"
          onClick={nextSlide}
        >
          →
        </button>

        <div className={styles.dots}>
          {slides.map((item, index) => (
            <button
              type="button"
              key={item.image}
              className={index === active ? styles.dotActive : styles.dot}
              aria-label={`Show slide ${index + 1}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
