import React from 'react';
import styles from './SkeletonItem.module.scss';

type Props = {
  additionalClass?: string;
};

export const SkeletonItem: React.FC<Props> = ({ additionalClass }) => {
  return <div className={`${styles.skeletonItem} ${additionalClass}`.trim()} />;
};
