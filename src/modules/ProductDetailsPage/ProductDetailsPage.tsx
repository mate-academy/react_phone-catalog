import styles from './ProductDetailsPage.module.scss';
import { useGetProductDetails } from './hooks/useGetProductDetails';
import { BackButton } from '../../shared/UI/Buttons/BackButton';

import { AlsoLikeSlider } from './components/AlsoLikeSlider/AlsoLikeSlider';
import { Product } from './components/Product/Product';
import { Loader } from '../shared/components/Loader';
import { useGoBack } from '../shared/hooks/useGoBack';
import { PrdctDtailBrdCrbs } from './components/PrdctDtailBrdCrbs';
import { DetailCardSkeleton } from '../../shared/UI/Skeletons/DetailCardSkeleton';
import { CustomSkeleton } from '../../shared/UI/Skeletons/CustomSkeleton';
import { useTranslation } from 'react-i18next';

export const ProductDetailsPage = () => {
  const { t } = useTranslation();
  const { goBack } = useGoBack();
  const { product, isLoading, isError, onReload } = useGetProductDetails();

  if (isLoading) {
    return (
      <div className={styles.page}>
        <PrdctDtailBrdCrbs productName={'...'} />

        <BackButton onClick={goBack} className={styles.back} />

        <CustomSkeleton classNames={styles.titleSkeleton} />

        <DetailCardSkeleton />

        <AlsoLikeSlider />
      </div>
    );
  }

  if (isError) {
    return <Loader status="error" onReload={onReload} />;
  }

  if (!product) {
    return (
      <Loader status="empty" emptyMessage={t('ui.errors.product_not_found')} />
    );
  }

  return (
    <div className={styles.page}>
      <PrdctDtailBrdCrbs productName={product.name} />

      <BackButton onClick={goBack} className={styles.back} />

      <h1 className={styles.title}>{product.name}</h1>

      <Product />

      <AlsoLikeSlider />
    </div>
  );
};
