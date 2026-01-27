import styles from './ProductDetailsPage.module.scss';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Breadcrumbs from '../shared/Breadcrumbs';
import Icon from '../shared/Icon';
import { useSelectedProductDetail } from './ProductDetailPage.hooks';
import ProductDetailMain from './ProductDetailMain';
import ProductDetailBottom from './ProductDetailBottom';
import { ProductCatalogItem } from '../../types/ProductCatalogItem';
import { SLIDER_COUNT } from '../constants';
import { useContext } from 'react';
import { ProductCatalogContext } from '../../ProductCatalogContext';
import CatalogSlider from '../shared/CatalogSlider';

function getSuggestedProducts(
  products: ProductCatalogItem[],
): ProductCatalogItem[] {
  if (!products.length) {
    return [];
  }

  const maxId = products[products.length - 1].id;
  const uniqueIds = new Set();

  while (uniqueIds.size < SLIDER_COUNT) {
    const randomNumber = Math.floor(Math.random() * maxId) + 1;

    uniqueIds.add(randomNumber);
  }

  return products.filter(product => uniqueIds.has(product.id));
}

export const ProductDetailsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { products: catalogProducts } = useContext(ProductCatalogContext);
  const { productDetail, loading, error } = useSelectedProductDetail();

  return (
    <div className="container">
      <Breadcrumbs lastSegment={productDetail?.name} />
      {loading && <p>Loading</p>}
      {error && <p>error</p>}
      {productDetail && (
        <div>
          <a
            href="#"
            className={styles.productDetail__buttonBack}
            onClick={e => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            <Icon iconStyles={{ image: ['arrowLeft'] }} />
            <span>{t('product-detail.back')}</span>
          </a>
          <h1 className={styles.productDetail__title}>{productDetail.name}</h1>
          <ProductDetailMain product={productDetail} />
          <ProductDetailBottom product={productDetail} />
        </div>
      )}
      {catalogProducts.length && (
        <CatalogSlider
          title={t('product-detail.may_like')}
          products={getSuggestedProducts(catalogProducts)}
          additionalStyles={styles.productDetail__slider_marginTop}
        />
      )}
    </div>
  );
};

export default ProductDetailsPage;
