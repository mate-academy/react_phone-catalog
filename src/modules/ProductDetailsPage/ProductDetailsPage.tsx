import { useParams } from 'react-router-dom';
import { BackButton } from '../shared/components/BackButton';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import { Loader } from '../shared/components/Loader';
import { CATEGORY_NAMES } from '../shared/constants/categoryNames';
import { useProductDetails } from './hooks/useProductDetails';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const { data, isLoading, hasError, reload } = useProductDetails(productId);

  const renderContent = () => {
    if (hasError) {
      return <ErrorMessage onReload={reload} />;
    }

    if (!data) {
      if (isLoading) {
        return <Loader />;
      }

      return (
        <div className={styles.notFound}>
          <BackButton />

          <img
            src="img/product-not-found.png"
            alt=""
            className={styles.notFoundImage}
          />

          <h1 className={styles.notFoundText}>Product was not found</h1>
        </div>
      );
    }

    const { details } = data;

    return (
      <>
        <Breadcrumbs
          items={[
            {
              label: CATEGORY_NAMES[details.category],
              to: `/${details.category}`,
            },
            { label: details.name },
          ]}
          className={styles.breadcrumbs}
        />

        <BackButton className={styles.back} />

        <h1 className={styles.title}>{details.name}</h1>

        {/* Gallery, options and specs will go here */}
      </>
    );
  };

  return <div className={styles.page}>{renderContent()}</div>;
};
