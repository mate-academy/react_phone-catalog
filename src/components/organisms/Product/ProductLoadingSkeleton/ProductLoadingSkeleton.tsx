import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

import templateStyles from '@/components/templates/ProductTemplate/ProductTemplate.module.scss';

import styles from './ProductLoadingSkeleton.module.scss';
import classNames from 'classnames';

const SkeletonLine = ({
  width,
  height = 16,
}: {
  width: string | number;
  height?: number;
}) => (
  <Skeleton
    width={width}
    height={height}
    borderRadius={4}
  />
);

export const ProductLoadingSkeleton = () => (
  <div
    className={classNames(templateStyles.container, styles.container)}
    aria-busy="true"
    aria-label="Loading product"
  >
    <div className={templateStyles.breadcrumbs}>
      <div className={styles.breadcrumbs}>
        <SkeletonLine
          width={56}
          height={16}
        />
        <SkeletonLine
          width={12}
          height={16}
        />
        <SkeletonLine
          width={96}
          height={16}
        />
        <SkeletonLine
          width={12}
          height={16}
        />
        <SkeletonLine
          width={160}
          height={16}
        />
      </div>
    </div>

    <div className={templateStyles.backButton}>
      <SkeletonLine
        width={88}
        height={20}
      />
    </div>

    <div className={templateStyles.titleRow}>
      <div className={styles.productTitle}>
        <SkeletonLine
          width="100%"
          height={32}
        />
      </div>

      <div className={styles.rating}>
        <Skeleton
          width={120}
          height={28}
          borderRadius={8}
        />
      </div>
    </div>

    <div className={templateStyles.info}>
      <div className={templateStyles.slider}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton
                key={index}
                className={styles.thumbnail}
                borderRadius={8}
              />
            ))}
          </div>

          <div className={styles.mainImage}>
            <Skeleton
              className={styles.imageSkeleton}
              borderRadius={12}
            />
          </div>
        </div>
      </div>

      <span className={templateStyles.separator} />

      <div className={templateStyles.purchase}>
        <div className={styles.purchaseContent}>
          <div className={styles.optionGroup}>
            <SkeletonLine
              width={100}
              height={18}
            />

            <div className={styles.colors}>
              {Array.from({ length: 5 }, (_, index) => (
                <Skeleton
                  key={index}
                  circle
                  width={32}
                  height={32}
                />
              ))}
            </div>
          </div>

          <div className={styles.optionGroup}>
            <SkeletonLine
              width={90}
              height={18}
            />

            <div className={styles.capacities}>
              <Skeleton
                width={76}
                height={40}
                borderRadius={6}
              />
              <Skeleton
                width={76}
                height={40}
                borderRadius={6}
              />
              <Skeleton
                width={76}
                height={40}
                borderRadius={6}
              />
            </div>
          </div>

          <div className={styles.priceBlock}>
            <SkeletonLine
              width={160}
              height={32}
            />
            <SkeletonLine
              width={110}
              height={18}
            />
          </div>

          <div className={styles.actions}>
            <Skeleton
              className={styles.cartButton}
              borderRadius={4}
            />

            <Skeleton
              className={styles.favouriteButton}
              borderRadius={4}
            />
          </div>

          <div className={styles.purchaseDetails}>
            <SkeletonLine
              width="80%"
              height={14}
            />
            <SkeletonLine
              width="60%"
              height={14}
            />
          </div>
        </div>
      </div>
    </div>

    <section className={templateStyles.firstSection}>
      <div className={styles.sectionContent}>
        <SkeletonLine
          width={120}
          height={28}
        />

        <div className={styles.divider} />

        <div className={styles.descriptionBlock}>
          <SkeletonLine
            width={220}
            height={22}
          />

          <div className={styles.paragraph}>
            <SkeletonLine width="100%" />
            <SkeletonLine width="96%" />
            <SkeletonLine width="88%" />
            <SkeletonLine width="65%" />
          </div>
        </div>

        <div className={styles.descriptionBlock}>
          <SkeletonLine
            width={180}
            height={22}
          />

          <div className={styles.paragraph}>
            <SkeletonLine width="100%" />
            <SkeletonLine width="90%" />
            <SkeletonLine width="72%" />
          </div>
        </div>
      </div>
    </section>

    <span className={templateStyles.separator} />

    <section className={templateStyles.secondSection}>
      <div className={styles.sectionContent}>
        <SkeletonLine
          width={160}
          height={28}
        />

        <div className={styles.divider} />

        <div className={styles.specs}>
          {Array.from({ length: 7 }, (_, index) => (
            <div
              key={index}
              className={styles.specRow}
            >
              <SkeletonLine
                width="80%"
                height={16}
              />
              <SkeletonLine
                width="90%"
                height={16}
              />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className={templateStyles.comments}>
      <div className={styles.sectionContent}>
        <SkeletonLine
          width={140}
          height={28}
        />

        <div className={styles.divider} />

        {Array.from({ length: 2 }, (_, index) => (
          <div
            key={index}
            className={styles.comment}
          >
            <div className={styles.commentHeader}>
              <SkeletonLine
                width={120}
                height={20}
              />
              <SkeletonLine
                width={90}
                height={14}
              />
            </div>

            <SkeletonLine
              width={160}
              height={14}
            />

            <div className={styles.paragraph}>
              <SkeletonLine
                width="85%"
                height={16}
              />
              <SkeletonLine
                width="65%"
                height={16}
              />
            </div>

            <SkeletonLine
              width={100}
              height={16}
            />
          </div>
        ))}
      </div>
    </section>
  </div>
);
