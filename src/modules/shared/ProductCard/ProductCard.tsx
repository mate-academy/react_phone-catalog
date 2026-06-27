import styles from './ProductCard.module.scss';

import { ProductCatalogItem } from '../../../types/ProductCatalogItem';
import { BASE_URL, CATALOG_SPECS_LIST } from '../../constants';
import { Link } from 'react-router-dom';
import ProductSpecs from '../ProductSpecs';
import PriceTag from '../PriceTag';
import ProductActions from '../ProductActions';

interface Props {
  product: ProductCatalogItem;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.product}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.product__link}
      >
        <img
          className={styles.product__image}
          src={BASE_URL + '/' + product.image}
          alt={product.name}
        />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.product__title}
      >
        {product.name}
      </Link>

      <PriceTag {...product} />

      <ProductSpecs product={product} specsList={CATALOG_SPECS_LIST} />
      <ProductActions product={product} />
    </div>
  );
};

export default ProductCard;
