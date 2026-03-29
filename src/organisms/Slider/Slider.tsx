import s from './Slider.module.scss';
import Chevron from '@/assets/icons/chevron.svg?react';
import { Button, Section } from '@/atoms';
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
    <Section className={s.slider__section}>
      <div className={s.sectionHeader}>
        <Section.Title className={s.sectionTitle}>{title}</Section.Title>
      </div>

      <div className={s.slider}>
        <Button
          classNames={s.button__left}
          onClick={prev}
          disabled={isFirstSlide}
        >
          <Chevron />
        </Button>

        <div className={s.slider__insider}>
          <div className={s.slider__modalBlock}>
            <div className={s.modal}>
              {SLIDES.map((item, index) => (
                <div
                  key={item.title}
                  className={cn(s.modalContent, {
                    [s.modalContentActive]: slide === index,
                  })}
                >
                  <p className={s.modalEyebrow}>{item.eyebrow}</p>
                  <h3 className={s.modalTitle}>{item.title}</h3>
                  <p className={s.modalDescription}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={s.slider__imageBlock}>
            {SLIDES.map((item, index) => (
              <img
                key={item.image}
                className={cn(s.slideImage, {
                  [s.slideImageActive]: slide === index,
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
          classNames={s.button__right}
          onClick={next}
          disabled={isLastSlide}
        >
          <Chevron />
        </Button>

        <div className={s.pagination}>
          {SLIDES.map((_, index) => (
            <div
              key={index}
              className={s.pagination__block}
              onClick={() => setSlide(index)}
            >
              <div
                className={cn(s.pagination__anchor, {
                  [s['pagination__anchor--active']]: slide === index,
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
