import type { FC } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { GoBackButton } from '../../components/GoBackButton';
import { ProductDescriptionSection } from '../../components/Sections/ProductDescriptionSection';
import { ProductOverviewSection } from '../../components/Sections/ProductOverviewSection';
import { RecommendedProductsSection } from '../../components/Sections/RecommendedProductsSection';

import { CustomSpinner } from '../../components/Spinner';
import { useDetailedProduct } from '../../hooks/useDetailedProduct';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import styles from './ProductPage.module.scss';

export const ProductPage: FC = () => {
  const { category, itemId } = useParams<{
    category: string;
    itemId: string;
  }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const {
    product,
    loading,
    error,
    productNotFound,
    updateProductUrl,
    currentSelectedColorFromUrl,
    currentSelectedCapacityFromUrl,
  } = useDetailedProduct({
    category,
    itemId,
    searchParams,
    navigate,
    location,
  });

  if (productNotFound) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.productPage}>
      {loading && (
        <div className={styles.loadingContainer}>
          <CustomSpinner
            size="lg"
            color="primary"
            label="Loading..."
          />
        </div>
      )}

      {!loading && error && (
        <>
          <div className={styles.breadcrumbs}>
            <Breadcrumbs lastItemNameOverride="Error" />
          </div>
          <div className={styles.back}>
            <GoBackButton />
          </div>
          <h1 className={styles.productErrorTitle}>Error Loading Product</h1>
          <div className={styles.errorMessage}>{error}</div>
        </>
      )}

      {!loading && !error && product && (
        <>
          <div className={styles.breadcrumbs}>
            <Breadcrumbs lastItemNameOverride={product.name} />
          </div>
          <div className={styles.back}>
            <GoBackButton />
          </div>
          <h1 className={styles.productPageTitle}>{product.name}</h1>

          <div className={styles.productPageContent}>
            <ProductOverviewSection
              product={product}
              selectedColor={currentSelectedColorFromUrl}
              selectedCapacity={currentSelectedCapacityFromUrl}
              onOptionChange={updateProductUrl}
            />
            <ProductDescriptionSection product={product} />
            <RecommendedProductsSection />
          </div>
        </>
      )}
    </div>
  );
};
