import styles from './ProductCardSkeleton.module.scss';

import { Skeleton } from '../Skeleton/Skeleton';
import { CiImageOn } from 'react-icons/ci';

export const ProductCardSkeleton = () => {
  return (
    <article className={styles.skeleton}>
      <Skeleton className={styles.preview}>
        <CiImageOn size={64} />
      </Skeleton>

      <Skeleton className={styles.title} />

      <Skeleton className={styles.price} />
      <div className={styles.specsSkeleton}>
        <Skeleton className={styles.specSkeleton}></Skeleton>
        <Skeleton className={styles.specSkeleton}></Skeleton>
        <Skeleton className={styles.specSkeleton}></Skeleton>
      </div>

      <Skeleton className={styles.buttonsSkeleton}></Skeleton>
    </article>
  );
};
