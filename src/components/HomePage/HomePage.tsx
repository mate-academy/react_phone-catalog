import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getProductsAsync } from '../../features/getProductsSlice';
import { ItemsList } from '../ItemsList/ItemsList';
import { Loader } from '../Loader';
import { SliderMain } from '../SliderMain';
import styles from './HomePage.module.scss';
import { Category } from '../Category';
import { DiscountItemList } from '../DiscountItemList';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const loadedItems = useAppSelector(state => state.products.loaded);

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  return (
    <>
      <div className={styles.generalHomePage}>
        <section className={styles.greeting}>
          <h1 className={styles.greeting__title}>
            Welcome to Nice Gadgets store!
          </h1>
          <SliderMain />
        </section>

        {loadedItems ? (
          <section className={styles.newModels}>
            <ItemsList />
          </section>
        ) : (
          <Loader />
        )}

        <section className={styles.category}>
          <h2 className={styles.category_title}>Shop by category</h2>

          <div className={styles.category_blocks}>
            <Category />
          </div>
        </section>

        {loadedItems ? (
          <section className={styles.hotPrices}>
            <DiscountItemList />
          </section>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};
