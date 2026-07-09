import { useState, useEffect, useCallback } from 'react';
import styles from './BannerCarousel.module.scss';
// import '../../pages/HomePage/HomePage.scss';

import ArrowLeft from '../../assets/Icons/Arrow_left.svg';
import ArrowRight from '../../assets/Icons/Arrow_right.svg';

interface SlideContent {
  id: number;
  badge?: string;
  headline: string;
  subheadline: string;
  body?: string;
  cta: string;
  ctaHref?: string;
  bgColor: string;
  accentColor: string;
  visual: React.ReactNode;
}

const IPhone14Visual = () => (
  <div
    style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    }}
  >
    <div
      style={{
        position: 'absolute',
        width: 220,
        height: 220,
        borderRadius: '50%',
        background:
          // eslint-disable-next-line max-len
          'radial-gradient(circle at 40% 40%, #a855f7 0%, #7c3aed 40%, #1a0040 100%)',
        filter: 'blur(40px)',
        opacity: 0.6,
      }}
    />
    {/* Phone back */}
    <div
      style={{
        position: 'absolute',
        bottom: 10,
        right: 40,
        width: 140,
        height: 160,
        borderRadius: 22,
        background: 'linear-gradient(135deg, #3d1a6e 0%, #1a0a3c 100%)',
        border: '1.5px solid #5b2d9e',
        boxShadow: '0 20px 60px rgba(120,0,255,0.3)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: 18,
      }}
    >
      {/* Camera module */}
      <div
        style={{
          position: 'absolute',
          top: 18,
          left: 18,
          width: 68,
          height: 68,
          borderRadius: 18,
          background: '#0d0020',
          border: '1px solid #3a1a60',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 6,
          padding: 10,
        }}
      >
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background:
                'radial-gradient(circle at 35% 35%, #4a4a5a, #1a1a2a)',
              border: '1px solid #333',
              boxShadow: 'inset 0 0 4px rgba(100,150,255,0.3)',
            }}
          />
        ))}
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 4,
            background: '#1a1a2a',
            border: '1px solid #333',
          }}
        />
      </div>
    </div>
    {/* Phone front */}
    <div
      style={{
        position: 'relative',
        width: 145,
        height: 190,
        borderRadius: 28,
        background: 'linear-gradient(160deg, #2d1255 0%, #0f0525 100%)',
        border: '1.5px solid #6d28d9',
        boxShadow:
          // eslint-disable-next-line max-len
          '0 30px 80px rgba(109,40,217,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        overflow: 'hidden',
        marginRight: -20,
      }}
    >
      {/* Screen */}
      <div
        style={{
          position: 'absolute',
          inset: 6,
          borderRadius: 22,
          background:
            'linear-gradient(135deg, #c026d3 0%, #7c3aed 50%, #4f46e5 100%)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              // eslint-disable-next-line max-len
              'radial-gradient(ellipse at 60% 20%, rgba(255,255,255,0.15) 0%, transparent 70%)',
          }}
        />
      </div>
      {/* Dynamic island */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 52,
          height: 10,
          borderRadius: 10,
          background: '#000',
          zIndex: 10,
        }}
      />
    </div>
  </div>
);

const MacBookVisual = () => (
  <div
    style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    }}
  >
    <div
      style={{
        position: 'absolute',
        width: 250,
        height: 200,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, #0ea5e9 0%, #0284c7 40%, #001a30 100%)',
        filter: 'blur(50px)',
        opacity: 0.5,
      }}
    />
    <div style={{ position: 'relative' }}>
      {/* Lid */}
      <div
        style={{
          width: 220,
          height: 140,
          borderRadius: '12px 12px 4px 4px',
          background: 'linear-gradient(160deg, #1e293b 0%, #0f172a 100%)',
          border: '1.5px solid #334155',
          boxShadow: '0 -4px 30px rgba(14,165,233,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 6,
            borderRadius: 8,
            background:
              'linear-gradient(135deg, #0c4a6e 0%, #0ea5e9 50%, #38bdf8 100%)',
            opacity: 0.9,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              // eslint-disable-next-line max-len
              'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.12) 0%, transparent 60%)',
          }}
        />
      </div>
      {/* Base */}
      <div
        style={{
          width: 240,
          height: 10,
          marginLeft: -10,
          borderRadius: '0 0 8px 8px',
          background: 'linear-gradient(180deg, #1e293b, #0f172a)',
          border: '1.5px solid #334155',
          borderTop: 'none',
        }}
      />
    </div>
  </div>
);

const AirPodsVisual = () => (
  <div
    style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    }}
  >
    <div
      style={{
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, #f59e0b 0%, #d97706 40%, #1a0f00 100%)',
        filter: 'blur(50px)',
        opacity: 0.4,
      }}
    />
    {/* Case */}
    <div
      style={{
        position: 'relative',
        width: 110,
        height: 130,
        borderRadius: 24,
        background:
          'linear-gradient(160deg, #fef3c7 0%, #d4a800 40%, #92701a 100%)',
        border: '1.5px solid #fbbf24',
        boxShadow:
          // eslint-disable-next-line max-len
          '0 20px 50px rgba(245,158,11,0.35), inset 0 1px 0 rgba(255,255,255,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Lid line */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 12,
          right: 12,
          height: 1.5,
          background: 'rgba(0,0,0,0.15)',
          borderRadius: 2,
        }}
      />
      {/* LED */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#22c55e',
          boxShadow: '0 0 8px #22c55e',
        }}
      />
    </div>
  </div>
);

const slides: SlideContent[] = [
  {
    id: 1,
    headline: 'Now available\nin our store!',
    subheadline: 'Pro. Beyond.',
    body: 'Be the first!',
    cta: 'ORDER NOW',
    bgColor: '#0d0d0d',
    accentColor: '#a855f7',
    visual: <IPhone14Visual />,
  },
  {
    id: 2,
    headline: 'MacBook Pro\nRevised',
    subheadline: 'Supercharged by M3.',
    body: 'The most powerful laptop ever.',
    cta: 'EXPLORE NOW',
    bgColor: '#020c1b',
    accentColor: '#38bdf8',
    visual: <MacBookVisual />,
  },
  {
    id: 3,
    headline: 'AirPods Pro\nPure Sound.',
    subheadline: 'Adaptive Audio. Always.',
    body: 'Silence the world around you.',
    cta: 'SHOP NOW',
    bgColor: '#0d0900',
    accentColor: '#f59e0b',
    visual: <AirPodsVisual />,
  },
];

export const BannerCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const go = useCallback(
    (idx: number, dir: 'left' | 'right') => {
      if (animating) {
        return;
      }

      setAnimating(true);
      setDirection(dir);
      setTimeout(() => {
        setCurrent(idx);
        setAnimating(false);
      }, 350);
    },
    [animating],
  );

  const prev = () => go((current - 1 + slides.length) % slides.length, 'left');
  const next = () => go((current + 1) % slides.length, 'right');

  useEffect(() => {
    const t = setInterval(() => next(), 5000);

    return () => clearInterval(t);
  }, [current]);

  const slide = slides[current];

  return (
    <>
      <div className={styles['carousel-root']}>
        <div className={styles['carousel-wrapper']}>
          {/* ВИПРАВЛЕНО: Два класи з модулів об'єднані правильно */}
          <button
            className={`${styles['nav-btn']} ${styles['nav-prev']}`}
            onClick={prev}
            aria-label="Previous"
          >
            <img
              src={ArrowLeft}
              alt="arrow_left"
              style={{ filter: 'brightness(0)' }}
            />
          </button>
          <button
            className={`${styles['nav-btn']} ${styles['nav-next']}`}
            onClick={next}
            aria-label="Next"
          >
            <img
              src={ArrowRight}
              alt="arrow_left"
              style={{ filter: 'brightness(0)' }}
            />
          </button>

          <div className={styles['carousel-track']}>
            {/* ВИПРАВЛЕНО: Динамічні класи тепер теж беруться зі styles */}
            <div
              className={`${styles['carousel-slide']} ${
                animating
                  ? direction === 'right'
                    ? styles['enter-right']
                    : styles['enter-left']
                  : styles.visible
              }`}
              style={{ background: slide.bgColor }}
            >
              {/* Left: text */}
              <div className={styles['slide-content']}>
                <h2
                  className={styles['slide-headline']}
                  style={{ color: slide.accentColor }}
                >
                  {slide.headline}
                </h2>
                {slide.subheadline && (
                  <p className={styles['slide-sub']} style={{ color: '#fff' }}>
                    {slide.subheadline}
                  </p>
                )}
                {slide.body && (
                  <p className={styles['slide-body']} style={{ color: '#fff' }}>
                    {slide.body}
                  </p>
                )}
                <button
                  className={styles['slide-cta']}
                  style={{
                    borderColor: `${slide.accentColor}55`,
                    color: slide.accentColor,
                  }}
                >
                  {slide.cta}
                </button>
              </div>

              {/* Right: visual */}
              <div className={styles['slide-visual']}>{slide.visual}</div>
            </div>
          </div>

          {/* ВИПРАВЛЕНО: Класи крапок теж підключені до стилів */}
          <div className={styles.dots}>
            {slides.map((s, i) => (
              <button
                key={s.id}
                className={`${styles.dot} ${i === current ? styles.active : ''}`}
                onClick={() => go(i, i > current ? 'right' : 'left')}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
