//#region imports
import { SkeletonItem } from '../../../shared/components/SkeletonItem';
import baseStyles from './base.module.scss';
import styles from './AboutSkeleton.module.scss';
//#endregion

export const AboutSkeleton = () => (
  <div className={baseStyles.about}>
    <div className={baseStyles.title}>
      <SkeletonItem additionalClass={styles.title} />
    </div>

    <div className={baseStyles.descriptionBlock}>
      {Array.from({ length: 3 }).map((_, i) => (
        <article key={i} className={baseStyles.description}>
          <SkeletonItem additionalClass={styles.subTitle} />

          <SkeletonItem additionalClass={styles.paragraph} />
        </article>
      ))}
    </div>
  </div>
);
