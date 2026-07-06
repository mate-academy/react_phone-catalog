//#region imports
import { FC } from 'react';
import { SkeletonItem } from '../SkeletonItem';
import baseStyles from './base.module.scss';
import styles from './PageTitleSkeleton.module.scss';
//#endregion

type Props = {
  withCount?: boolean;
};

export const PageTitleSkeleton: FC<Props> = ({ withCount = false }) => (
  <div className={baseStyles.pageTitle}>
    <SkeletonItem additionalClass={styles.title} />

    {withCount && <SkeletonItem additionalClass={styles.count} />}
  </div>
);
