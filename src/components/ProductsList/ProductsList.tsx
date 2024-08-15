import { CommonPropsProduct } from '../../types/CommonPropsProduct';
import { getSequence } from '../../utils/getSequence';
import { ErrorNotification } from '../ErrorNotification';
import { ProductCard } from '../ProductCard';
import { SkeletonCard } from '../SkeletonCard';
import styles from './ProductsList.module.scss';

interface Props {
  name: string;
  products: CommonPropsProduct[];
  perPage?: number;
  loading?: boolean;
  errorMsg?: string;
}

export const ProductsList: React.FC<Props> = ({
  name,
  products,
  perPage = 16,
  loading = false,
  errorMsg = '',
}) => {
  const normalizedPerPage = perPage ? perPage : 16;
  const sequence = getSequence(1, normalizedPerPage);

  if (loading) {
    return (
      <div className={styles.productsList}>
        {sequence.map(n => (
          <SkeletonCard key={n} />
        ))}
      </div>
    );
  }

  if (errorMsg) {
    return <ErrorNotification errorMsg={errorMsg} name={name} />;
  }

  if (!products.length) {
    return <ErrorNotification noProducts={true} name={name} />;
  }

  return (
    <div className={styles.productsList}>
      {products.map(product => (
        <ProductCard key={product.itemId} product={product} />
      ))}
    </div>
  );
};
