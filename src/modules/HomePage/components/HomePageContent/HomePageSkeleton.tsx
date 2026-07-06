/* eslint-disable max-len */
//#region imports
import { ProductSliderSkeleton } from '../../../shared/components/ProductSlider';
import { SkeletonItem } from '../../../shared/components/SkeletonItem';
import { BannerSliderSkeleton } from '../BannerSlider/BannerSliderSkeleton';
import { CategoriesSkeleton } from '../Categories';
import baseStyles from './base.module.scss';
import styles from './HomePageSkeleton.module.scss';
//#endregion

export const HomePageSkeleton = () => (
  <section className={baseStyles.homePage} role="status" aria-busy="true">
    <SkeletonItem additionalClass={`${styles.title} ${baseStyles.title}`} />

    <div className={baseStyles.main}>
      <BannerSliderSkeleton />

      <ProductSliderSkeleton />

      <CategoriesSkeleton />

      <ProductSliderSkeleton />
    </div>
  </section>
);
