import styles from './ProductDetailBottom.module.scss';

import { useTranslation } from 'react-i18next';

import ProductSpecs from '../../shared/ProductSpecs';
import ProductDescription from '../ProductDescription';
import { ProductDetail } from '../../../types/ProductDetail';
import { TECH_SPECS_LIST } from '../../constants';

interface Props {
  product: ProductDetail;
}

const ProductDetailBottom: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.productDetailBottom}>
      <ProductDescription
        description={product.description}
        additionalStyles={styles.productDetailBottom__description}
      />

      <div className={styles.productDetailBottom__specs}>
        <h3 className={styles.productDetailBottom__specsTitle}>
          {t('product-detail.tech_specs')}
        </h3>
        <ProductSpecs
          product={product}
          specsList={TECH_SPECS_LIST}
          langPage="product-detail"
          styleTechSpecs
        />
      </div>
    </div>
  );
};

export default ProductDetailBottom;
