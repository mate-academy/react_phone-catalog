import { Skeleton } from '@/shared/components/Skeleton';
import styles from './ProductsListSkeleton.module.scss';
import { toRem } from '@/shared/utils/toRem';
// eslint-disable-next-line max-len
import { ProductCardSkeleton } from '@/shared/components/ProductCard/components/ProductCardSkeleton';
import classNames from 'classnames';
import { usePaginationParams } from '../../hooks/usePaginationParams';
import { PAGINATION_BUTTONS } from '../../constants/pagination';

interface Props {
  hasFilters?: boolean;
  hasPagination?: boolean;
}

const PRODUCT_CARDS_COUNT = 16;

export const ProductsListSkeleton = ({
  hasFilters = true,
  hasPagination = true,
}: Props) => {
  const { perPage } = usePaginationParams();

  const skeletonsCount = +perPage || PRODUCT_CARDS_COUNT;

  return (
    <div className={styles.productsListSkeleton}>
      {hasFilters && (
        <div className={styles.controls}>
          <div className={classNames(styles.dropdown, styles.sortBy)}>
            <Skeleton width={toRem(48)} height={toRem(15)} />
            <Skeleton width="100%" height={toRem(42)} />
          </div>

          <div className={classNames(styles.dropdown, styles.itemsPerPage)}>
            <Skeleton width={toRem(90)} height={toRem(15)} />
            <Skeleton width="100%" height={toRem(42)} />
          </div>
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.list}>
          {Array.from({ length: skeletonsCount }, (_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>

        {hasPagination && (
          <div className={styles.pagination}>
            <div className={styles.IconButton}>
              <Skeleton width={toRem(32)} height={toRem(32)} />
            </div>

            <div className={styles.pages}>
              {Array.from({ length: PAGINATION_BUTTONS }, (_, index) => (
                <div key={index} className={styles.IconButton}>
                  <Skeleton width={toRem(32)} height={toRem(32)} />
                </div>
              ))}
            </div>

            <div className={styles.IconButton}>
              <Skeleton width={toRem(32)} height={toRem(32)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
