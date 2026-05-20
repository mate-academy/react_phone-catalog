import { useTranslation } from 'react-i18next';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import styles from './HeroSlider.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchBanners } from '@/api/banners';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

export const HeroSlider = () => {
  const autoplay = Autoplay({ delay: 5000, stopOnInteraction: false });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay]);
  const { t } = useTranslation('common');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const { data: banners = [], isLoading } = useQuery({
    queryKey: ['banners'],
    queryFn: fetchBanners,
  });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  if (isLoading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  const currentBanner = banners[selectedIndex];

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainControls}>
        <button className={styles.navBtn} onClick={scrollPrev}>
          <ChevronLeft size={32} />
        </button>

        <div className={styles.sliderRelativeWrapper}>
          <div className={styles.staticOverlay}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${selectedIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={styles.contentBox}
              >
                <h3 className={styles.subtitle}>{t(currentBanner.subtitle)}</h3>
                <Link to={currentBanner.link} className={styles.cta}>
                  {t('home.orderNow')}
                </Link>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${selectedIndex}`}
                initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={styles.modelName}
              >
                {currentBanner.title}
              </motion.h1>
            </AnimatePresence>
          </div>
          <section className={styles.viewport} ref={emblaRef}>
            <div className={styles.container}>
              {banners.map(banner => (
                <div
                  key={banner.id}
                  className={styles.slide}
                  style={{ backgroundColor: banner.color }}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      src={banner.img}
                      alt={banner.title}
                      className={styles.image}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <button className={styles.navBtn} onClick={scrollNext}>
          <ChevronRight size={32} />
        </button>
      </div>

      <div className={styles.dots}>
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === selectedIndex ? styles.dotActive : ''}`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};
