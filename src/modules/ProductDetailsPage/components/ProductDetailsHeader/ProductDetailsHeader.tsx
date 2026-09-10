import { BackButton } from '@/shared/components/BackButton';
import styles from './ProductDetailsHeader.module.scss';
import { Skeleton } from '@/shared/components/Skeleton';

interface Props {
  title: string;
  isLoading?: boolean;
}

export const ProductDetailsHeader = ({ title, isLoading = false }: Props) => {
  return (
    <div className={styles.productDetailsHeader}>
      <BackButton />

      {isLoading ? (
        <div className={styles.titleSkeleton}>
          <Skeleton width="100%" height="100%" />
        </div>
      ) : (
        <h1 className={styles.title}>{title}</h1>
      )}
    </div>
  );
};
