/* eslint-disable max-len */
//#region imports
import { useTranslation } from 'react-i18next';
import { BreadcrumbsSkeleton } from '../../../shared/components/Breadcrumbs';
import { ProductSliderSkeleton } from '../../../shared/components/ProductSlider';
import { SkeletonItem } from '../../../shared/components/SkeletonItem';
import { AboutSkeleton } from '../About';
import { MainParamsSkeleton } from '../MainParams';
import { ProductGallerySkeleton } from '../ProductGallery';
import { TechSpecsBlockSkeleton } from '../TechSpecsBlock';
import baseStyles from './base.module.scss';
import styles from './ProductDetailsSkeleton.module.scss';
//#endregion

export const ProductDetailsSkeleton = () => {
  const { t } = useTranslation('productDetails');

  return (
    <div role="status" aria-busy="true" aria-label={t('loading')}>
      <div className={baseStyles.topBar}>
        <BreadcrumbsSkeleton />

        <SkeletonItem additionalClass={styles.backButton} />
      </div>

      <SkeletonItem additionalClass={`${baseStyles.title} ${styles.title}`} />

      <div className={baseStyles.productDetails}>
        <div className={baseStyles.productMain}>
          <div className={baseStyles.gallery}>
            <ProductGallerySkeleton />
          </div>

          <div className={baseStyles.mainParams}>
            <MainParamsSkeleton />
          </div>
        </div>

        <div className={baseStyles.descriptionBlock}>
          <div className={baseStyles.about}>
            <AboutSkeleton />
          </div>

          <div className={baseStyles.techSpecs}>
            <TechSpecsBlockSkeleton />
          </div>
        </div>

        <ProductSliderSkeleton />
      </div>
    </div>
  );
};
