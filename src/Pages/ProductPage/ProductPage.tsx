import { useAppSelector } from '../../app/hooks';
import { ProductFilter } from '../../components/ProductFilter/ProductFilter';
import ProductList from '../../components/ProductList/ProductList';
import { useFilterItems } from '../../hooks/useFilterItems';
import { useSearchParams } from 'react-router-dom';
import styles from './ProductPage.module.scss';

export const ProductPage = () => {
  const { products } = useAppSelector(state => state.product);
  const [searchParams] = useSearchParams();
  const productsPerPage = searchParams.get('quantity') || 12;

  const { sortedProducts, updateFilter, updateQuantity, getTitleName } =
    useFilterItems(products);

  const title = getTitleName();

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <p className={styles.models}>{sortedProducts.length} models</p>
      <ProductFilter
        updateFilter={updateFilter}
        updateQuantity={updateQuantity}
      />
      <ProductList
        sortedProducts={sortedProducts}
        productsPerPage={+productsPerPage}
      />
    </div>
  );
};
