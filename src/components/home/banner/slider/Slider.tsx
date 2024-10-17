import { FC, useEffect, useState } from 'react';

import styles from './slider.module.scss';

import { Arrows } from './arrows/Arrows';
import { Order } from './order/Order';
import { Dots } from './dots/Dots';
import { SliderList } from './slider-list/SliderList';

import { ArrowLeftIcon } from '@ui/icon/ArrowLeftIcon';
import { ArrowRightIcon } from '@ui/icon/ArrowRightIcon';
import { IMAGES } from '@utils/constants/imagesSLider';

export const Slider: FC = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const lastIndex = IMAGES.length - 1;

  const showNextImage = () => {
    setImgIndex(index => (index === lastIndex ? 0 : index + 1));
  };

  const showPrevImage = () => {
    setImgIndex(index => (index === 0 ? lastIndex : index - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const swipeDistance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance) {
      showNextImage();
    } else if (swipeDistance < -minSwipeDistance) {
      showPrevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const goToImage = (index: number) => {
    setImgIndex(index);
  };

  useEffect(() => {
    const slider = setInterval(showNextImage, 5000);

    return () => clearInterval(slider);
  }, [imgIndex, lastIndex]);

  return (
    <div
      className={styles.slider}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.wrapper}>
        <Arrows slider={showPrevImage} label="Previous Image">
          <ArrowLeftIcon />
        </Arrows>

        <div className={styles.content}>
          <Order />

          <SliderList index={imgIndex} />
        </div>

        <Arrows slider={showNextImage} label="Next Image">
          <ArrowRightIcon />
        </Arrows>
      </div>

      <Dots goToImage={goToImage} imgIndex={imgIndex} />
    </div>
  );
};
