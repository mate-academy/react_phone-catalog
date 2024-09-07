import { FC, useEffect, useState } from 'react';

import styles from './slider.module.scss';

import { SlidesList } from './slides-list/SlidesList';
import { Arrows } from './arrows/Arrows';
import { Order } from './order/Order';
import { Dots } from './dots/Dots';

import { ArrowLeftIcon } from '@ui/icon/ArrowLeftIcon';
import { ArrowRightIcon } from '@ui/icon/ArrowRightIcon';
import { IMAGES } from '@utils/constants/imagesSLider';

export const Slider: FC = () => {
  const [imgIndex, setImgIndex] = useState(0);

  const lastIndex = IMAGES.length - 1;

  const showNextImage = () => {
    setImgIndex(index => (index === lastIndex ? 0 : index + 1));
  };

  const showPrevImage = () => {
    setImgIndex(index => (index === 0 ? lastIndex : index - 1));
  };

  const goToImage = (index: number) => {
    setImgIndex(index);
  };

  useEffect(() => {
    const slider = setInterval(() => {
      setImgIndex(index => (index === lastIndex ? 0 : index + 1));
    }, 5000);

    return () => clearInterval(slider);
  }, [imgIndex, lastIndex]);

  return (
    <div className={styles.slider}>
      <div className={styles.wrapper}>
        <Arrows slider={showPrevImage} label="Previous Image">
          <ArrowLeftIcon />
        </Arrows>

        <div className={styles.content}>
          <Order />

          <SlidesList index={imgIndex} />
        </div>

        <Arrows slider={showNextImage} label="Next Image">
          <ArrowRightIcon />
        </Arrows>
      </div>

      <Dots goToImage={goToImage} imgIndex={imgIndex} />
    </div>
  );
};
