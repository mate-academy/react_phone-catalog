import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Icons } from '@ui/index';

import { useImageSlider } from '@hooks/useImageSlider';

import { IMAGES } from '@utils/constants/imagesSLider';

import styles from './Slider.module.scss';
import { Arrows, Dots, Order, SliderList } from './index';

export const Slider: FC = () => {
  const slider = useImageSlider(IMAGES);
  const { t } = useTranslation();

  const localPrevious = t('home.banner.slider.previous');
  const localNext = t('home.banner.slider.next');

  return (
    <div
      className={styles.slider}
      onTouchStart={slider.onTouchStart}
      onTouchMove={slider.onTouchMove}
      onTouchEnd={slider.onTouchEnd}
    >
      <div className={styles.wrapper}>
        <Arrows onClick={slider.showPrevImage} label={localPrevious}>
          <Icons.ArrowLeftIcon />
        </Arrows>

        <div className={styles.content}>
          <Order />

          <SliderList index={slider.imgIndex} />
        </div>

        <Arrows onClick={slider.showNextImage} label={localNext}>
          <Icons.ArrowRightIcon />
        </Arrows>
      </div>

      <Dots goToImage={slider.goToImage} imgIndex={slider.imgIndex} />
    </div>
  );
};
