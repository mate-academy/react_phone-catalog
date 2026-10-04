import { useParams } from 'react-router-dom';
import { useProduct } from '@/shared/api/hooks/useProduct';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { ProductCardDetails } from './components/ProductCardDetails';
import { useProductsDetails } from '@/shared/api/hooks/useProductsDetails';
import styles from './ProductPage.module.scss';
import container from '@/shared/styles/Container.module.scss';
import { ProductSkeleton } from '@/shared/components/ProductSkeleton';

export const ProductPage = () => {
  const { productId } = useParams();

  const { product, isLoading, hasError, reload } = useProduct(productId);

  const category = product?.category;

  const { products: productsDetails } = useProductsDetails(category);

  if (isLoading) {
    return (
      <div className={container.container}>
        <ProductSkeleton />
      </div>
    );
  }

  if (hasError) {
    return <ErrorMessage onReload={reload} />;
  }

  if (!product) {
    return (
      <div className={container.container}>
        <h1 className={styles.notFound}>Product not found</h1>
      </div>
    );
  }

  const sameModelProducts = productsDetails.filter(
    item => item.namespaceId === product.namespaceId,
  );

  return (
    <ProductCardDetails
      product={product}
      sameModelProducts={sameModelProducts}
    />
  );
};
