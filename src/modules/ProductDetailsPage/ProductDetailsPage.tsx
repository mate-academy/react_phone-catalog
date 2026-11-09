import { useParams } from 'react-router-dom';
import { BackButton } from '../shared/components/BackButton';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import { Loader } from '../shared/components/Loader';
import { CATEGORY_NAMES } from '../shared/constants/categoryNames';
import { ProductActions } from '../shared/components/ProductActions';
import { SpecsList } from '../shared/components/SpecsList';
import { ProductGallery } from './components/ProductGallery';
import { ProductInfo } from './components/ProductInfo';
import { SuggestedProducts } from './components/SuggestedProducts';
import { useProductDetails } from './hooks/useProductDetails';
import { VariantSelector } from './components/VariantSelector';
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

    const { product, details } = data;

    const shortSpecs = [
      { label: 'Screen', value: details.screen },
      { label: 'Resolution', value: details.resolution },
      { label: 'Processor', value: details.processor },
      { label: 'RAM', value: details.ram },
    ];

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

        <div className={styles.main}>
          <ProductGallery
            key={details.id}
            images={details.images}
            name={details.name}
          />

          <div className={styles.options}>
            <VariantSelector details={details} productNumber={product.id} />

            <p className={styles.prices}>
              <span className={styles.price}>${details.priceDiscount}</span>
              <s className={styles.fullPrice}>${details.priceRegular}</s>
            </p>

            <ProductActions
              product={product}
              size="large"
              className={styles.actions}
            />

            <SpecsList specs={shortSpecs} />
          </div>
        </div>

        <ProductInfo details={details} className={styles.info} />

        <SuggestedProducts
          key={details.namespaceId}
          namespaceId={details.namespaceId}
          className={styles.suggested}
        />
      </>
    );
  };

  return <div className={styles.page}>{renderContent()}</div>;
};
