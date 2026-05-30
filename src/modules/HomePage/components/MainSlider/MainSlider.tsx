import styles from './MainSlider.module.scss';
import classNames from 'classnames';

import useEmblaCarousel from 'embla-carousel-react';
import { useSliderPrevNextBtns } from '@/modules/shared/hooks/useSliderPrevNextBtns';
import { useSliderDots } from '@/modules/shared/hooks/useSliderDots';
import { Button } from '@/modules/shared/components/Button';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import Autoplay from 'embla-carousel-autoplay';
import { Slide } from '../Slide/Slide';
import { SlideUI } from '../../../shared/types/SlideUI';

const slides: (SlideUI & { id: string })[] = [
  {
    id: 'iphone-14-pro-banner',
    productTitle: 'iPhone 14 Pro',
    bannerPreviewPath: 'img/slider/phones-slide.png',
    productDescription: 'Pro. Beyond.',
    url: '/product/apple-iphone-14-pro-128gb-gold',
  },
  {
    id: 'apple-ipad-pro-banner',
    productTitle: 'Apple iPad Pro',
    bannerPreviewPath: 'img/slider/tablets-slide.png',
    productDescription: 'Pro. Beyond.',
    url: '/product/apple-ipad-pro-11-2021-128gb-spacegray',
  },
  {
    id: 'apple-watch-6-banner',
    productTitle: 'Apple Watch 6',
    bannerPreviewPath: 'img/slider/accessories-slide.jpeg',
    productDescription: 'The future of health si on your wrist.',
    url: '/product/apple-watch-series-6-40mm-space-gray',
  },
];

export const MainSlider = () => {
  const [sliderRef, sliderApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay({ delay: 5000, stopOnMouseEnter: true })],
  );
  const { handleNext, handlePrev, nextBtnDisabled, prevBtnDisabled } =
    useSliderPrevNextBtns(sliderApi);
  const { dots, onDotClick, selectedIndex } = useSliderDots(sliderApi);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderTop}>
        <Button
          variant="outline"
          onClick={handlePrev}
          isDisabled={prevBtnDisabled}
          startIcon={<FaAngleLeft size={16} />}
          className={classNames(styles.sliderArrowBtn, styles.sliderPrevBtn)}
        />

        <div ref={sliderRef} className={styles.slider}>
          <div className={styles.slidesContainer}>
            {slides.map(slide => (
              <div className={styles.slide} key={slide.id}>
                <Slide {...slide} />
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleNext}
          className={classNames(styles.sliderArrowBtn, styles.sliderNextBtn)}
          isDisabled={nextBtnDisabled}
          startIcon={<FaAngleRight size={16} />}
        />
      </div>

      <div className={styles.sliderDots}>
        {dots.map((_, index) => (
          <span
            key={`hero-slide-dot-${index}`}
            className={classNames(styles.sliderDot, {
              [styles.sliderDotActive]: selectedIndex === index,
            })}
            onClick={() => onDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};
