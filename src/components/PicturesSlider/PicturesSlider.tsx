import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../../utils/assets';
import { Icon } from '../Icon';
import styles from './PicturesSlider.module.scss';

const slides = [
  {
    category: 'phones',
    label: 'Phones',
    image: 'img/figma-assets/banner-phones-desktop.png',
    mobileImage: 'img/figma-assets/banner-phones-mobile.png',
    imageAlt: 'Now available in our store! iPhone 14 Pro. Pro. Beyond.',
  },
  {
    category: 'tablets',
    label: 'Tablets',
    image: 'img/banner-tablets.png',
    mobileImage: 'img/banner-tablets.png',
    imageAlt: 'Discover Apple iPad tablets',
  },
  {
    category: 'accessories',
    label: 'Accessories',
    image: 'img/banner-accessories.png',
    mobileImage: 'img/banner-accessories.png',
    imageAlt: 'Find Apple Watch accessories',
  },
];

export const PicturesSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const isRotating =
    !paused && !hovered && !focused && !reducedMotion && !pageHidden;
  const slide = slides[activeIndex];

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setPageHidden(document.hidden);

    updatePreference();
    updateVisibility();
    preference.addEventListener('change', updatePreference);
    document.addEventListener('visibilitychange', updateVisibility);

    return () => {
      preference.removeEventListener('change', updatePreference);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!isRotating) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex(current => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isRotating]);

  const changeSlide = (direction: number) => {
    setActiveIndex(
      current => (current + direction + slides.length) % slides.length,
    );
  };

  return (
    <section
      className={styles.slider}
      aria-label="Featured collections"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false);
        }
      }}
    >
      <div className={styles.row}>
        <button
          className={`icon-button ${styles.arrow}`}
          type="button"
          aria-label="Previous collection"
          onClick={() => changeSlide(-1)}
        >
          <Icon name="left" />
        </button>
        <div
          className={`${styles.slide} ${styles[slide.category]}`}
          aria-live={isRotating ? 'off' : 'polite'}
          aria-atomic="true"
          aria-roledescription="slide"
          aria-label={`${activeIndex + 1} of ${slides.length}: ${slide.label}`}
        >
          <Link
            className={styles.visual}
            to={`/${slide.category}`}
            aria-label={`Explore ${slide.label.toLowerCase()}`}
          >
            <picture>
              <source
                media="(max-width: 639px)"
                srcSet={assetUrl(slide.mobileImage)}
              />
              <img
                className={styles.productImage}
                src={assetUrl(slide.image)}
                alt={slide.imageAlt}
                fetchPriority="high"
              />
            </picture>
          </Link>
        </div>
        <button
          className={`icon-button ${styles.arrow}`}
          type="button"
          aria-label="Next collection"
          onClick={() => changeSlide(1)}
        >
          <Icon name="right" />
        </button>
      </div>
      <div className={styles.bottom}>
        <div className={styles.dashes} aria-label="Choose collection">
          {slides.map((item, index) => (
            <button
              key={item.category}
              className={`${styles.dash} ${index === activeIndex ? styles.active : ''}`}
              type="button"
              aria-label={`Show slide ${index + 1}: ${item.label}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <button
          className={styles.pause}
          type="button"
          aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}
          aria-pressed={paused}
          onClick={() => setPaused(current => !current)}
        >
          {paused ? 'Play' : 'Pause'}
        </button>
      </div>
    </section>
  );
};
