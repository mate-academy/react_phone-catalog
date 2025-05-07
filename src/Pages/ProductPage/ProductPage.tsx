import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ProductFilter } from '../../components/ProductFilter/ProductFilter';
import ProductList from '../../components/ProductList/ProductList';
import { useFilterItems } from '../../hooks/useFilterItems';
import { useSearchParams } from 'react-router-dom';
import styles from './ProductPage.module.scss';
import { NavigatePanel } from '../../components/NavigatePanel/NavigatePanel';
import { ItemPage } from '../ItemPage/ItemPage';
import { useEffect } from 'react';
import itemSlice from '../../features/product/itemSlice';

export const ProductPage = () => {
  const { products } = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const productsPerPage = searchParams.get('quantity') || 12;
  const item = searchParams.get('item');
  const category = searchParams.get('category');

  const { sortedProducts, updateFilter, updateQuantity, getTitleName } =
    useFilterItems(products);

  useEffect(() => {
    if (category === 'phones') {
      if (item) {
        dispatch(itemSlice.actions.selectPhone(item));
      }
    }

    if (category === 'tablets') {
      if (item) {
        dispatch(itemSlice.actions.selectTablet(item));
      }
    }

    if (category === 'accessories') {
      if (item) {
        dispatch(itemSlice.actions.selectAccessories(item));
      }
    }
  }, [item, category]);

  const title = getTitleName();

  return (
    <div className={styles.container}>
      {item && category ? (
        <>
          <NavigatePanel />
          <ItemPage />
        </>
      ) : (
        <>
          <NavigatePanel />
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
        </>
      )}
    </div>
  );
};
