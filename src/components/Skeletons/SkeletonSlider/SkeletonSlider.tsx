import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styles from './SkeletonSlider.module.scss';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/css/navigation';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Languages } from '../../../types/Languages';
// eslint-disable-next-line max-len
import { SkeletonProductCard } from '../SkeletonProductCard';
import React from 'react';
import { SliderTitle } from '../../../types/SliderTitle';

interface Props {
  sliderTitle: string;
}

export const SkeletonSlider: React.FC<Props> = ({ sliderTitle }) => {
  const { i18n } = useTranslation();

  return (
    <SkeletonTheme baseColor="#3B3E4A" highlightColor="#4A4D58">
      <section className={styles.suggestionsContainer}>
        <h2 className={styles.title}>
          <Skeleton
            className={classNames({
              [styles.titleNewModelsUA]:
                i18n.language !== Languages.en.toLowerCase(),
              [styles.titleHotPrices]:
                sliderTitle === SliderTitle.hotPrices ||
                sliderTitle === SliderTitle.hotPricesUA,
            })}
          />
          <Skeleton
            className={classNames(styles.titleNewModels, {
              [styles.titleNewModelsEN]:
                i18n.language === Languages.en.toLowerCase() &&
                (sliderTitle === SliderTitle.newModels ||
                  sliderTitle === SliderTitle.newModelsUA),
            })}
          />
        </h2>
        <div
          className={classNames(styles.buttons, {
            [styles.buttonsEN]: i18n.language === Languages.en.toLowerCase(),
            [styles.buttonsHotPrices]:
              sliderTitle === SliderTitle.hotPrices ||
              sliderTitle === SliderTitle.hotPricesUA,
          })}
        >
          <Skeleton circle={true} className={styles.btn} />
          <Skeleton circle={true} className={styles.btn} />
        </div>
        <div className={styles.productCardsContainer}>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <SkeletonProductCard key={index} />
            ))}
        </div>
      </section>
    </SkeletonTheme>
  );
};
