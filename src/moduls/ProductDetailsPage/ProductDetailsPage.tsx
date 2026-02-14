import { useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import { GoBackButton } from '../../shared/components/GoBackButton';
import { useProductDetails } from '../../shared/utils/hooks/useProductDetails';
import styles from './ProductDetailsPage.module.scss';
import { RandomSuggest } from './components/RandomSuggest';
import notFound from '../../../public/img/product-not-found.png';
import { About } from './components/About';
import { TechSpec } from './components/TechSpec';
import { MainInfo } from './components/MainInfo';
import { DetailsSkeleton } from './components/DetailsSkeleton';

export const ProductDetailsPage = () => {
  const { product, isError, isLoading } = useProductDetails();
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  return (
    <main className={styles.productDetailsPage}>
      <div className="page-container">
        <div className={styles.navigate}>
          <Breadcrumbs />
          <GoBackButton onClick={handleGoBack} />
        </div>

        {isLoading && <DetailsSkeleton />}

        {!isLoading && isError && (
          <div>
            <h2>Error</h2>
          </div>
        )}

        {!product && !isError && !isLoading && (
          <div className={styles.notFound}>
            <h2>Product was not found</h2>
            <img src={notFound} />
          </div>
        )}

        {product && !isLoading && !isError && (
          <div className={styles.product}>
            <h2 className={styles.title}>{product.name}</h2>
            <div className={styles.fullInfo}>
              <MainInfo item={product} />
              <About description={product.description} />
              <TechSpec product={product} />
            </div>
          </div>
        )}
        {product && !isLoading && !isError && (
          <RandomSuggest currentProductId={product?.id} />
        )}
      </div>
    </main>
  );
};
