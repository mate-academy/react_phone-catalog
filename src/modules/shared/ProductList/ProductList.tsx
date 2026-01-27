import styles from './ProductList.module.scss';
import { ProductCatalogItem } from '../../../types/ProductCatalogItem';
import ProductCard from '../ProductCard';

interface Props {
  pageProducts: ProductCatalogItem[];
}

const ProductsList: React.FC<Props> = ({ pageProducts }) => {
  return (
    <div className={styles.productsList}>
      {pageProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
