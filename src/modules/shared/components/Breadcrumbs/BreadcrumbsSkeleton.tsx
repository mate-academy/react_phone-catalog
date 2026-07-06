//#region imports
import { ArrowRightIcon } from './components/ArrowRightIcon';
import { SkeletonItem } from '../SkeletonItem';
import baseStyles from './base.module.scss';
import styles from './BreadcrumbsSkeleton.module.scss';
//#endregion

export const BreadcrumbsSkeleton = () => (
  <ol className={baseStyles.navList}>
    <li>
      <SkeletonItem additionalClass={styles.homeLink} />
    </li>

    <li className={baseStyles.navItem}>
      <ArrowRightIcon />

      <SkeletonItem additionalClass={styles.link} />
    </li>

    <li className={baseStyles.navItem}>
      <ArrowRightIcon />

      <SkeletonItem additionalClass={styles.label} />
    </li>
  </ol>
);
