import { FC, ReactNode } from 'react';
import baseStyles from './base.module.scss';
import styles from './ParamSelectorSkeleton.module.scss';
import { SkeletonItem } from '../../../shared/components/SkeletonItem';

type Props = {
  paramItem: ReactNode;
};

export const ParamSelectorSkeleton: FC<Props> = ({ paramItem }) => (
  <div className={baseStyles.paramSelector}>
    <SkeletonItem additionalClass={styles.title} />

    <ul className={baseStyles.paramList}>
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i}>{paramItem}</li>
      ))}
    </ul>
  </div>
);
