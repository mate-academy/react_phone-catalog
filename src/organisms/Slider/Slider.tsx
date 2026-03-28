import styles from './Slider.module.scss';
import Chevron from '@/assets/icons/chevron.svg?react';
import Button from '@/atoms/Button';
import Section from '@/atoms/Section';
import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';
import { AUTOPLAY_DELAY, SLIDES } from '@/const';

type Props = {
  title: string;
};

const Slider = ({ title }: Props) => {
  const [slide, setSlide] = useState(0);
  const isFirstSlide = slide === 0;
  const isLastSlide = slide === SLIDES.length - 1;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSlide(prev => (prev + 1) % SLIDES.length);
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [slide]);

  const next = () => {
    if (isLastSlide) {
      return;
    }

    setSlide(prev => prev + 1);
  };

  const prev = () => {
    if (isFirstSlide) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    setSlide(prev => prev - 1);
  };

  return (
    <Section className={styles.slider__section}>
      <div className={styles.sectionHeader}>
        <Section.Title className={styles.sectionTitle}>{title}</Section.Title>
      </div>

      <div className={styles.slider}>
        <Button
          classNames={styles.button__left}
          onClick={prev}
          disabled={isFirstSlide}
        >
          <Chevron />
        </Button>

        <div className={styles.slider__insider}>
          <div className={styles.slider__modalBlock}>
            <div className={styles.modal}>
              {SLIDES.map((item, index) => (
                <div
                  key={item.title}
                  className={cn(styles.modalContent, {
                    [styles.modalContentActive]: slide === index,
                  })}
                >
                  <p className={styles.modalEyebrow}>{item.eyebrow}</p>
                  <h3 className={styles.modalTitle}>{item.title}</h3>
                  <p className={styles.modalDescription}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.slider__imageBlock}>
            {SLIDES.map((item, index) => (
              <img
                key={item.image}
                className={cn(styles.slideImage, {
                  [styles.slideImageActive]: slide === index,
                })}
                src={item.image}
                alt={`Banner ${index + 1}`}
                width="600"
                height="300"
                decoding="async"
                draggable="false"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
        </div>

        <Button
          classNames={styles.button__right}
          onClick={next}
          disabled={isLastSlide}
        >
          <Chevron />
        </Button>

        <div className={styles.pagination}>
          {SLIDES.map((_, index) => (
            <div
              key={index}
              className={styles.pagination__block}
              onClick={() => setSlide(index)}
            >
              <div
                className={cn(styles.pagination__anchor, {
                  [styles['pagination__anchor--active']]: slide === index,
                })}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Slider;
