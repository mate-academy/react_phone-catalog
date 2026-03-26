import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Carousel.module.scss';

interface CarouselProps {
  title: string;
  children: React.ReactNode[];
}

export const Carousel = ({ title, children }: CarouselProps) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback((embla: EmblaCarouselType) => {
    setPrevBtnDisabled(!embla.canScrollPrev());
    setNextBtnDisabled(!embla.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className={`container ${styles.section}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.navButtons}>
          <button
            className={`${styles.navBtn} ${prevBtnDisabled ? styles.disabled : ''}`}
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <button
            className={`${styles.navBtn} ${nextBtnDisabled ? styles.disabled : ''}`}
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            aria-label="Next slide"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {children.map((child, index) => (
            <div className={styles.emblaSlide} key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
