import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useT } from '../../context/LanguageContext';
import { TranslationKey } from '../../i18n/translations';
import bannerDesktop from '../../assets/banner.jpg';
import bannerMobile from '../../assets/banner-mobile.jpg';
import categoryTablets from '../../assets/category-tablets.jpg';
import categoryAccessories from '../../assets/category-accessories.jpg';
import styles from './PicturesSlider.module.scss';

interface ImageSlide {
  kind: 'image';
  desktop: string;
  mobile?: string;
  bg: string;
  to: string;
  ctaKey: TranslationKey;
}

interface CreativeSlide {
  kind: 'creative';
  variant: 'tablets' | 'accessories';
  tagKey: TranslationKey;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  ctaKey: TranslationKey;
  to: string;
  image: string;
}

type Slide = ImageSlide | CreativeSlide;

const SLIDES: Slide[] = [
  {
    kind: 'image',
    desktop: bannerDesktop,
    mobile: bannerMobile,
    to: '/phones',
    bg: '#1d1d1f',
    ctaKey: 'banner.cta.orderNow',
  },
  {
    kind: 'creative',
    variant: 'tablets',
    tagKey: 'banner.tag.tablets',
    titleKey: 'banner.title.tablets',
    subtitleKey: 'banner.subtitle.tablets',
    ctaKey: 'banner.cta.tablets',
    to: '/tablets',
    image: categoryTablets,
  },
  {
    kind: 'creative',
    variant: 'accessories',
    tagKey: 'banner.tag.accessories',
    titleKey: 'banner.title.accessories',
    subtitleKey: 'banner.subtitle.accessories',
    ctaKey: 'banner.cta.accessories',
    to: '/accessories',
    image: categoryAccessories,
  },
];

export const PicturesSlider = () => {
  const t = useT();
  const [active, setActive] = useState(0);
  const timerRef = useRef<number | null>(null);

  const start = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setActive(p => (p + 1) % SLIDES.length);
    }, 5000);
  };

  useEffect(() => {
    start();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const goto = (i: number) => {
    setActive((i + SLIDES.length) % SLIDES.length);
    start();
  };

  return (
    <section className={styles.section}>
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {SLIDES.map((slide, i) => (
            <article
              key={i}
              className={styles.slide}
              style={{ background: slide.kind === 'image' ? slide.bg : undefined }}
            >
              {slide.kind === 'image' ? (
                <>
                  <picture>
                    {slide.mobile && (
                      <source media="(max-width: 640px)" srcSet={slide.mobile} />
                    )}
                    <img
                      src={slide.desktop}
                      alt=""
                      className={styles.slideImage}
                    />
                  </picture>
                  <Link
                    to={slide.to}
                    className={styles.orderNow}
                    aria-label={t(slide.ctaKey)}
                  />
                  <Link
                    to={slide.to}
                    className={styles.orderNowMobile}
                  >
                    {t(slide.ctaKey)}
                  </Link>
                </>
              ) : (
                <CreativeSlideContent slide={slide} t={t} />
              )}
            </article>
          ))}
        </div>

        <button
          type="button"
          className={classNames(styles.arrow, styles.arrowPrev)}
          onClick={() => goto(active - 1)}
          aria-label={t('aria.prevSlide')}
        >
          ‹
        </button>
        <button
          type="button"
          className={classNames(styles.arrow, styles.arrowNext)}
          onClick={() => goto(active + 1)}
          aria-label={t('aria.nextSlide')}
        >
          ›
        </button>
      </div>

      <ul className={styles.dots}>
        {SLIDES.map((_, i) => (
          <li key={i}>
            <button
              type="button"
              className={classNames(styles.dot, {
                [styles.dotActive]: i === active,
              })}
              onClick={() => goto(i)}
              aria-label={`${t('aria.nextSlide')} ${i + 1}`}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

interface CreativeProps {
  slide: CreativeSlide;
  t: (key: TranslationKey) => string;
}

const CreativeSlideContent = ({ slide, t }: CreativeProps) => (
  <div className={classNames(styles.creative, styles[`creative_${slide.variant}`])}>
    <div className={styles.creativeBlobOne} aria-hidden />
    <div className={styles.creativeBlobTwo} aria-hidden />
    <div className={styles.creativeGrid} aria-hidden />

    <div className={styles.creativeText}>
      <span className={styles.creativeTag}>
        <span className={styles.creativeTagDot} aria-hidden />
        {t(slide.tagKey)}
      </span>
      <h2 className={styles.creativeTitle}>{t(slide.titleKey)}</h2>
      <p className={styles.creativeSubtitle}>{t(slide.subtitleKey)}</p>
      <Link to={slide.to} className={styles.creativeCta}>
        {t(slide.ctaKey)}
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden>
          <path
            d="M3 8h10m0 0L9 4m4 4l-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>

    <div className={styles.creativeImageWrap}>
      <div
        className={styles.creativeImageGlow}
        aria-hidden
      />
      <img
        src={slide.image}
        alt={t(slide.titleKey)}
        className={styles.creativeImage}
      />
    </div>
  </div>
);
