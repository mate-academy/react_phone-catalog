import { Category } from '../CategoryHomePage';
import { DiscountItemList } from '../ItemsListDiscountHomePage';
import { ItemsList } from '../ItemsList';
import { SliderMain } from '../SliderMain';
import styles from './HomePage.module.scss';
import { useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';

export const HomePage = () => {
  const loadedItems = useAppSelector(state => state.products.loaded);

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
