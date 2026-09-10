import { Skeleton } from '@/shared/components/Skeleton';
import styles from './ProductDetailsSkeleton.module.scss';
import { Divider } from '@/shared/components/Divider';
import { toRem } from '@/shared/utils/toRem';
import { ProductsSlider } from '@/shared/components/ProductsSlider';

export const ProductDetailsSkeleton = () => {
  return (
    <div className={styles.productDetails}>
      <div className={styles.productFacts}>
        <div className={styles.productGallery}>
          <div className={styles.activeImg}>
            <Skeleton width="100%" height="100%" />
          </div>

          <div className={styles.imgsList}>
            <Skeleton width="100%" />
            <Skeleton width="100%" />
            <Skeleton width="100%" />
            <Skeleton width="100%" />
            <Skeleton width="100%" />
          </div>
        </div>

        <div className={styles.productInfo}>
          <div className={styles.colorsSection}>
            <div className={styles.colorsHeader}>
              <Skeleton width={toRem(100)} height={toRem(15)} />
              <Skeleton width={toRem(35)} height={toRem(15)} />
            </div>

            <div className={styles.productColors}>
              <Skeleton
                width={toRem(32)}
                height={toRem(32)}
                borderRadius="50%"
              />
              <Skeleton
                width={toRem(32)}
                height={toRem(32)}
                borderRadius="50%"
              />
              <Skeleton
                width={toRem(32)}
                height={toRem(32)}
                borderRadius="50%"
              />
            </div>
          </div>

          <Divider />

          <div className={styles.capacitySection}>
            <Skeleton width={toRem(100)} height={toRem(15)} />

            <div className={styles.productCapacity}>
              <Skeleton width={toRem(60)} height={toRem(32)} />
              <Skeleton width={toRem(60)} height={toRem(32)} />
              <Skeleton width={toRem(60)} height={toRem(32)} />
            </div>
          </div>

          <Divider />

          <div className={styles.purchaseSection}>
            <div className={styles.purchaseSectionContent}>
              <Skeleton width={toRem(140)} height={toRem(28)} />

              <div className={styles.purchaseButtons}>
                <Skeleton width="100%" height={toRem(48)} />
                <div className={styles.favoriteButton}>
                  <Skeleton width={toRem(48)} height={toRem(48)} />
                </div>
              </div>
            </div>

            <div className={styles.specs}>
              <div className={styles.spec}>
                <Skeleton width={toRem(42)} height={toRem(15)} />
                <Skeleton width={toRem(166)} height={toRem(15)} />
              </div>
              <div className={styles.spec}>
                <Skeleton width={toRem(64)} height={toRem(15)} />
                <Skeleton width={toRem(54)} height={toRem(15)} />
              </div>
              <div className={styles.spec}>
                <Skeleton width={toRem(60)} height={toRem(15)} />
                <Skeleton width={toRem(97)} height={toRem(15)} />
              </div>
              <div className={styles.spec}>
                <Skeleton width={toRem(28)} height={toRem(15)} />
                <Skeleton width={toRem(24)} height={toRem(15)} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.productData}>
        <div className={styles.productAbout}>
          <div className={styles.productAboutHeader}>
            <Skeleton width={toRem(62)} height={toRem(26)} />
            <Divider />
          </div>

          <div className={styles.textBlock}>
            <Skeleton width={toRem(90)} height={toRem(20)} />

            <div className={styles.textBlockContent}>
              <Skeleton width="100%" height={toRem(63)} />
              <Skeleton width="100%" height={toRem(126)} />
            </div>
          </div>

          <div className={styles.textBlock}>
            <Skeleton width={toRem(65)} height={toRem(20)} />

            <div className={styles.textBlockContent}>
              <Skeleton width="100%" height={toRem(189)} />
            </div>
          </div>

          <div className={styles.textBlock}>
            <Skeleton width="100%" height={toRem(40)} />

            <div className={styles.textBlockContent}>
              <Skeleton width="100%" height={toRem(210)} />
            </div>
          </div>
        </div>

        <div className={styles.fullSpecs}>
          <div className={styles.specsHeader}>
            <Skeleton width={toRem(113)} height={toRem(26)} />
            <Divider />
          </div>

          <div className={styles.specs}>
            <div className={styles.spec}>
              <Skeleton width={toRem(49)} height={toRem(21)} />
              <Skeleton width={toRem(182)} height={toRem(21)} />
            </div>
            <div className={styles.spec}>
              <Skeleton width={toRem(74)} height={toRem(21)} />
              <Skeleton width={toRem(61)} height={toRem(21)} />
            </div>
            <div className={styles.spec}>
              <Skeleton width={toRem(70)} height={toRem(21)} />
              <Skeleton width={toRem(113)} height={toRem(21)} />
            </div>
            <div className={styles.spec}>
              <Skeleton width={toRem(32)} height={toRem(21)} />
              <Skeleton width={toRem(28)} height={toRem(21)} />
            </div>
            <div className={styles.spec}>
              <Skeleton width={toRem(109)} height={toRem(21)} />
              <Skeleton width={toRem(40)} height={toRem(21)} />
            </div>
            <div className={styles.spec}>
              <Skeleton width={toRem(58)} height={toRem(21)} />
              <Skeleton width={toRem(130)} height={toRem(21)} />
            </div>
            <div className={styles.spec}>
              <Skeleton width={toRem(39)} height={toRem(21)} />
              <Skeleton width={toRem(141)} height={toRem(21)} />
            </div>
            <div className={styles.spec}>
              <Skeleton width={toRem(27)} height={toRem(21)} />
              <Skeleton width={toRem(204)} height={toRem(21)} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.suggestedProducts}>
        <ProductsSlider title="You may also like" isLoading={true} />
      </div>
    </div>
  );
};
