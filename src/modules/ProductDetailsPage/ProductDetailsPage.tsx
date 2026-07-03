import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import styles from './ProductDetailsPage.module.scss';
import { useProductDetails } from '../shared/hooks/useProductsDetails';

const categoryLabels: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const { product, isLoading, hasError, notFound, reload } =
    useProductDetails(productId);

  if (isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <Loader />
        </div>
      </main>
    );
  }

  if (hasError) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <ErrorMessage onReload={reload} />
        </div>
      </main>
    );
  }

  if (notFound || !product) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <p className={styles.notFound}>Product was not found</p>
        </div>
      </main>
    );
  }

  const categoryLabel = categoryLabels[product.category] || product.category;

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Breadcrumbs
          items={[
            { label: categoryLabel, path: `/${product.category}` },
            { label: product.name },
          ]}
        />

        <button onClick={handleGoBack}>Back</button>
      </div>
    </main>
  );
};
