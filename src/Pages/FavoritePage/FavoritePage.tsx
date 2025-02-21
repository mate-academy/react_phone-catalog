import { useAppSelector } from '../../app/hooks';
import { NavigatePanel } from '../../components/NavigatePanel/NavigatePanel';
import ProductList from '../../components/ProductList/ProductList';
import styles from './FavoritePage.module.scss';

export const FavoritePage = () => {
  const { products } = useAppSelector(state => state.favorite);

  return (
    <div className={styles.container}>
      <NavigatePanel />
      <h1>Favorite</h1>
      {products.length > 0 ? (
        <>
          <p className={styles.items}>{products.length} items</p>
          <ProductList sortedProducts={products} />
        </>
      ) : (
        <img src="/react_phone-catalog/img/product-not-found.png" className={styles.noItems}></img>
      )}
    </div>
  );
};
