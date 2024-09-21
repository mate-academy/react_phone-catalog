import { FC } from 'react';
import styles from './SkeletonProductList.module.scss';
import { SkeletonCard } from '../SkeletonCard/SkeletonCard';
import { useIconSrc } from '../../utils/hooks/useIconSrc';

type Props = {
  isLoading: boolean;
};

export const SkeletonProductList: FC<Props> = ({ isLoading }) => {
  const { spinnerUrl } = useIconSrc();

  return (
    <div className={styles.skeletonProduct}>
      <div className={styles.skeletonTop}>
        <img src={spinnerUrl} alt="" className={styles.skeletonSpinner} />
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
