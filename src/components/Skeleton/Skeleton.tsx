import type { FC } from 'react';
import styles from './Skeleton.module.scss';

interface SkeletonCardProps {
  width?: string;
}

export const SkeletonCard: FC<SkeletonCardProps> = ({ width }) => {
  const cardWidth = width ? width : styles.cardWidth;

  return (
    <div className={`animate-pulse ${cardWidth} ${styles.card}`}>
      <div className="p-8">
        <div
          className={`w-full ${styles.image} ${styles.skeleton} rounded-lg`}
        ></div>

        <h2 className={`w-full h-3.5 mt-4 ${styles.skeleton} rounded-lg`}></h2>
        <h2 className={`w-20 h-3.5 mt-1.5 ${styles.skeleton} rounded-lg`}></h2>
        <p className={`w-20 h-8 mt-4 ${styles.skeleton} rounded-lg`}></p>

        <div
          className={`w-full h-0.5 mt-5 ${styles.skeleton} rounded-lg`}
        ></div>

        <div className="w-full flex justify-between mt-1">
          <div className="w-18">
            <p className={`h-2 mt-4 ${styles.skeleton} rounded-lg`}></p>
            <p className={`h-2 mt-4 ${styles.skeleton} rounded-lg`}></p>
            <p className={`h-2 mt-4 ${styles.skeleton} rounded-lg`}></p>
          </div>
          <div className="w-18">
            <p className={`h-2 mt-4 ${styles.skeleton} rounded-lg`}></p>
            <p className={`h-2 mt-4 ${styles.skeleton} rounded-lg`}></p>
            <p className={`h-2 mt-4 ${styles.skeleton} rounded-lg`}></p>
          </div>
        </div>

        <div className="w-full flex justify-between mt-2">
          <div className={`h-10 w-28 mt-4 ${styles.skeleton} rounded-lg`}></div>
          <div className={`h-10 w-11 mt-4 ${styles.skeleton} rounded-lg`}></div>
        </div>
      </div>
    </div>
  );
};
