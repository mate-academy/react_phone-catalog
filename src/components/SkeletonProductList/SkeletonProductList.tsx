import { FC } from 'react';
import styles from './SkeletonProductList.module.scss';
import { SkeletonCard } from '../SkeletonCard/SkeletonCard';
import { Spinner } from '../Spinner/Spinner';

type Props = {
  isLoading: boolean;
};

export const SkeletonProductList: FC<Props> = ({ isLoading }) => {
  return (
    <div className={styles.skeletonProduct}>
      <div className={styles.skeletonTop}>
        <Spinner />
      </div>
      <div className={styles.skeletonList}>
        {isLoading &&
          Array.from({ length: 16 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
      </div>
    </div>
  );
};
