/* eslint-disable @typescript-eslint/indent */
import { SkeletonProductCard } from '@components/SkeletonProductCard';
import { ProductCard } from '@components/ProductCard';
import { Product } from '@models/Product';
import styles from './ProductList.module.scss';
import { ErrorMessage } from '@models/ErrorMessage';

type Props = {
  products: Product[];
  isLightMode: boolean;
  isLoading?: boolean;
  pageSelector?: number;
  errorMessage: ErrorMessage | null;
};

export const ProductList: React.FC<Props> = ({
  products,
  isLightMode,
  isLoading = false,
  pageSelector = 16,
}) => {
  return (
    <div className={styles.products__list}>
      {isLoading
        ? Array.from({ length: pageSelector }).map((_, i) => (
            <SkeletonProductCard key={i} />
          ))
        : products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              withFullPrice={false}
              isLightMode={isLightMode}
            />
          ))}
    </div>
  );
};
