import React from 'react';

import styles from './SkeletonLine.module.scss';

type Props = {
  height: string;
  width?: string;
};

export const SkeletonLine: React.FC<Props> = ({ height, width }) => {
  return (
    <div
      className={styles['skeleton-line']}
      style={{ height: `${height}px`, width: `${width}px` }}
    ></div>
  );
};
