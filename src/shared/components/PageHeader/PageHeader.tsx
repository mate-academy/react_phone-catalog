import { toRem } from '@/shared/utils/toRem';
import { Skeleton } from '../Skeleton';
import styles from './PageHeader.module.scss';

interface Props {
  title: string;
  productsCount: number;
  productsName?: string;
  isLoading?: boolean;
}

export const PageHeader = ({
  title,
  productsCount,
  productsName = 'items',
  isLoading = false,
}: Props) => {
  let count: React.ReactNode = null;

  if (isLoading) {
    count = <Skeleton width={toRem(100)} height={toRem(21)} />;
  } else if (productsCount > 0) {
    count = (
      <p className={styles.modelsCount}>
        {productsCount} {productsName}
      </p>
    );
  }

  return (
    <div className={styles.pageHeader}>
      <h1 className={styles.title}>{title}</h1>

      {count}
    </div>
  );
};
