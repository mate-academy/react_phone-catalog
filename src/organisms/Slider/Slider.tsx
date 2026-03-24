import styles from './Slider.module.scss';
import Chevron from '@/assets/icons/chevron.svg?react';
import Button from '@/atoms/Button';
import Section from '@/atoms/Section';
import { useState } from 'react';

type Props = {
  title: string;
};

const Slider = ({ title }: Props) => {
  const b = [
    '/img/banners/banner_0.jpg',
    '/img/banners/banner_1.jpg',
    '/img/banners/banner_2.jpg',
  ];

  const [slide, setSlide] = useState(0);
  const isFirstSlide = slide === 0;
  const isLastSlide = slide === b.length - 1;

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
    <Section>
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
            <div className={styles.modal}></div>
          </div>
          <div className={styles.slider__imageBlock}>
            <img
              key={slide}
              src={b[slide]}
              width="600"
              height="300"
              decoding="async"
              draggable="false"
            />
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
          {b.map((_, index) => (
            <div
              key={index}
              className={styles.pagination__block}
              onClick={() => setSlide(index)}
            >
              <div
                className={`${styles.pagination__anchor}
            ${slide === index ? styles['pagination__anchor--active'] : ''}`}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Slider;
