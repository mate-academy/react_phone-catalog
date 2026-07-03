// #region imports
import {
  ProductDetailsContent,
  ProductDetailsSkeleton,
} from './components/ProductDetailsContent';
import { ProductDetailsEmpty } from './components/ProductDetailsEmpty';
import { useParams } from 'react-router-dom';
import { useProductDetailsPage } from './services/useProductDetailsPage';
import { useTranslation } from 'react-i18next';
import styles from './ProductDetailsPage.module.scss';
// #endregion

export const ProductDetailsPage = () => {
  const { t } = useTranslation('productDetails');
  const { productId } = useParams();

  const { product, productDetails, isLoading, isError } = useProductDetailsPage(
    productId || '',
  );

  return (
    <section
      className={styles.productDetails}
      aria-label={productDetails?.name || t('productDetails')}
    >
      {isLoading && <ProductDetailsSkeleton />}

      {!isLoading && isError && <ProductDetailsEmpty />}

      {!isLoading && !isError && productDetails && product && (
        <ProductDetailsContent
          productDetails={productDetails}
          product={product}
        />
      )}
    </section>
  );
};
