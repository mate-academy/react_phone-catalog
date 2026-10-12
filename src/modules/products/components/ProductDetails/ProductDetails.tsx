import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import ArrowIcon from '@/assets/icons/arrow-up.svg?react';
import {
  useProductQuery,
  useRandomProductsQuery,
} from '@/modules/products/queries';
import { ScrollLineCards } from '@/shared/components';
import {
  Button,
  ErrorLabel,
  Loader,
  NotFoundLabel,
} from '@/shared/components/ui';
import { ROUTES } from '@/shared/constants';
import { BreadcrumbContext } from '@/shared/context/BreadcrumbContext';
import { useBaseBreadcrumbs } from '@/shared/hooks';

import { About } from './About';
import { Actions } from './Actions';
import { Gallery } from './Gallery';
import styles from './ProductDetails.module.scss';
import { Properties } from './Properties';

export const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: product, isLoading, isError, refetch } = useProductQuery(id!);
  const { t } = useTranslation();

  const { data: suggestedProducts } = useRandomProductsQuery(
    15,
    product?.category,
  );

  const { setBreadcrumbs } = useContext(BreadcrumbContext);
  const breadcrumbs = useBaseBreadcrumbs();

  useEffect(() => {
    if (!product) {
      return;
    }

    setBreadcrumbs([...breadcrumbs, { name: product?.name }]);
  }, [breadcrumbs, product, setBreadcrumbs]);

  return (
    <>
      {isLoading && <Loader className={styles.loader} />}
      {isError && (
        <ErrorLabel className={styles.errorLabel} onRetry={refetch} />
      )}
      {product && (
        <>
          <Button className={styles.backButton} onClick={() => navigate(-1)}>
            <ArrowIcon className={styles.backButton__arrow} />
            <span className={styles.backButton__text}>{t('back')}</span>
          </Button>

          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.productDetails}>
            <Gallery images={product.images} className={styles.gallery} />

            <Actions device={product} className={styles.actions} />

            <About description={product.description} className={styles.about} />

            <Properties device={product} className={styles.properties} />
          </div>
        </>
      )}
      {!isLoading && !isError && !product && (
        <NotFoundLabel
          title={t('nothingFoundForYourQuery')}
          handleClick={() => navigate(ROUTES.HOME)}
          className={styles.notFoundLabel}
        />
      )}
      {suggestedProducts && (
        <ScrollLineCards title={t('youMayAlsoLike')} data={suggestedProducts} />
      )}
    </>
  );
};
