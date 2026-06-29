import styles from './ProductDetailsPage.module.scss';

import { useTranslation } from 'react-i18next';

import Breadcrumbs from '../shared/Breadcrumbs';
import { useSelectedProductDetail } from './ProductDetailPage.hooks';
import ProductDetailMain from './ProductDetailMain';
import ProductDetailBottom from './ProductDetailBottom';
import { ProductCatalogItem } from '../../types/ProductCatalogItem';
import { SLIDER_COUNT } from '../constants';
import { useContext, useMemo } from 'react';
import { ProductCatalogContext } from '../../ProductCatalogContext';
import CatalogSlider from '../shared/CatalogSlider';
import BackButton from '../shared/BackButton';
import Loader from '../shared/Loader';

function getSuggestedProducts(
  catalogProducts: ProductCatalogItem[],
  itemId: string,
): ProductCatalogItem[] {
  if (!catalogProducts.length || !itemId) {
    return [];
  }

  const seenIndices = new Set<number>();
  const suggested = [];
  let count = 0;

  while (
    seenIndices.size < Math.min(SLIDER_COUNT, catalogProducts.length - 1) &&
    count < catalogProducts.length
  ) {
    const randomIndex = Math.floor(Math.random() * catalogProducts.length);
    const currentItem = catalogProducts[randomIndex];

    count++;

    if (
      !seenIndices.has(randomIndex) &&
      currentItem &&
      currentItem.itemId !== itemId
    ) {
      seenIndices.add(randomIndex);
      suggested.push(currentItem);
    }
  }

  return suggested;
}

export const ProductDetailsPage = () => {
  const { t } = useTranslation();
  const { products: catalogProducts } = useContext(ProductCatalogContext);
  const { productDetail, loading, error, loaded } = useSelectedProductDetail();

  const suggestedProducts = useMemo(() => {
    return getSuggestedProducts(catalogProducts, productDetail?.id || '');
  }, [catalogProducts, productDetail?.id]);

  return (
    <div className="container">
      <Breadcrumbs lastSegment={productDetail?.name} />

      {loading && <Loader className={styles.productDetail__loader} />}

      {error && <p>Something went wrong!</p>}

      {loaded && productDetail && (
        <>
          <BackButton />
          <h1 className={styles.productDetail__title}>{productDetail.name}</h1>
          <ProductDetailMain product={productDetail} />
          <ProductDetailBottom product={productDetail} />
        </>
      )}

      {loaded && productDetail && catalogProducts.length > 0 && (
        <CatalogSlider
          title={t('product-detail.may_like')}
          products={suggestedProducts}
          additionalStyles={styles.productDetail__slider_marginTop}
        />
      )}
    </div>
  );
};

export default ProductDetailsPage;
