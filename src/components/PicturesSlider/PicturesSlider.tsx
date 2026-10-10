import { useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';

const slides = [
  {
    title: 'The newest devices are here',
    subtitle: 'Discover the latest gadgets',
    image: '/img/banner-phones.png',
  },
  {
    title: 'Find your next favorite',
    subtitle: 'Smart choices for everyday life',
    image: '/img/banner-tablets.png',
  },
  {
    title: 'Accessories that fit your life',
    subtitle: 'Small details, big difference',
    image: '/img/banner-accessories.png',
  },
];

export function PicturesSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive(current => (current + 1) % slides.length),
      5000,
    );

    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[active];

  return (
    <section className={styles.slider} aria-label="Featured products">
      <button
        className={styles.arrow}
        onClick={() => setActive((active + slides.length - 1) % slides.length)}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <div className={styles.content}>
        <div className={styles.copy}>
          <p>WELCOME TO NICE GADGETS</p>
          <h2>{slide.title}</h2>
          <span>{slide.subtitle}</span>
          <a href="/phones">
            Shop now <b>→</b>
          </a>
        </div>
        <div className={styles.art}>
          <img
            src={slide.image}
            alt=""
            onError={event => {
              const target = event.currentTarget;

              target.style.display = 'none';
            }}
          />
        </div>
      </div>
      <button
        className={`${styles.arrow} ${styles.next}`}
        onClick={() => setActive((active + 1) % slides.length)}
        aria-label="Next slide"
      >
        ›
      </button>
      <div className={styles.dashes}>
        {slides.map((item, index) => (
          <button
            key={item.title}
            className={index === active ? styles.activeDash : ''}
            onClick={() => setActive(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
