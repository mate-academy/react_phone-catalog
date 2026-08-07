import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './DetailsSkeleton.module.scss';
import { SkeletonFadeIn } from '@shared/ui/SkeletonFadeIn';

const THUMBNAILS_COUNT = 5;
const COLORS_COUNT = 3;
const CAPACITY_COUNT = 3;
const SPECS_COUNT = 4;
const SECTION_COUNT = 3;
const TECHSPECS_COUNT = 8;

export const DetailsSkeleton: React.FC = () => (
  <>
    <SkeletonFadeIn>
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderNav}>
          <Skeleton width={16} height={16} />

          <Skeleton width={16} height={16} />

          <Skeleton width={45} height={16} />

          <Skeleton width={16} height={16} />

          <Skeleton className={styles.breadcrumbs} />
        </div>

        <div className={styles.backLink}>
          <Skeleton width={16} height={16} />

          <Skeleton width={31} height={16} />
        </div>

        <Skeleton className={styles.title} />
      </div>

      <div className={styles.details}>
        <div className={styles.gallery}>
          <div className={styles.galleryMain}>
            <Skeleton className={styles.galleryMainSkeleton} />
          </div>

          <div className={styles.galleryThumbs}>
            {Array.from({ length: THUMBNAILS_COUNT }).map((_, index) => (
              <div key={index} className={styles.galleryThumb}>
                <Skeleton className={styles.galleryThumbSkeleton} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.detailsInfoProduct}>
          <div className={styles.detailsWrapper}>
            <div className={styles.detailsColors}>
              <Skeleton className={styles.detailsLabel} />

              <div className={styles.colors}>
                {Array.from({ length: COLORS_COUNT }).map((_, index) => (
                  <Skeleton key={index} className={styles.colorsItem} />
                ))}
              </div>
            </div>

            <Skeleton className={styles.detailsProductId} />
          </div>

          <Skeleton height={1} />

          <div className={styles.detailsCapacity}>
            <Skeleton className={styles.detailsLabel} />

            <div className={styles.capacity}>
              {Array.from({ length: CAPACITY_COUNT }).map((_, index) => (
                <Skeleton key={index} className={styles.capacityItem} />
              ))}
            </div>
          </div>

          <Skeleton height={1} />

          <div className={styles.detailsPrices}>
            <Skeleton width={72} height={41} />

            <Skeleton width={52} height={28} />
          </div>

          <div className={styles.detailsButtons}>
            <div className={styles.detailsButtonMain}>
              <Skeleton height={48} />
            </div>

            <div className={styles.detailsButtonFavourite}>
              <Skeleton height={48} />
            </div>
          </div>

          <div className={styles.detailsProductSpecs}>
            {Array.from({ length: SPECS_COUNT }).map((_, index) => (
              <div key={index} className={styles.detailsSpecs}>
                <Skeleton className={styles.detailsSpecLabel} />
                <Skeleton className={styles.detailsSpecValue} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.detailsAbout}>
          <Skeleton className={styles.detailsAboutTitle} />

          {Array.from({ length: SECTION_COUNT }).map((_, index) => (
            <div key={index}>
              <Skeleton className={styles.detailsSectionTitle} />

              <Skeleton className={styles.detailsSectionText} />
            </div>
          ))}
        </div>

        <div className={styles.detailsTechSpecs}>
          <Skeleton className={styles.detailsAboutTitle} />

          <div className={styles.detailsProductSpecs}>
            {Array.from({ length: TECHSPECS_COUNT }).map((_, index) => (
              <div key={index} className={styles.detailsSpecs}>
                <Skeleton className={styles.detailsSpecLabel} />

                <Skeleton className={styles.detailsSpecValue} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonFadeIn>
  </>
);
