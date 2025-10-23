import { useTabs } from '../../ProductsContext/TabsContext';
import { Error } from '../shared/components/Error';
import { Loader } from '../shared/components/Loader';
import { ProductsStyleMode } from '../shared/types/types';
import styles from './HomePage.module.scss';
import { Categories } from './components/Categories';
import { PicturesSlider } from './components/PicturesSlider';
import { ProductsList } from './components/ProductsList';

export const HomePage = () => {
  const { productsList, loading, error } = useTabs();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  if (!productsList || productsList.length === 0) {
    return;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <div className={styles.elements}>
        <PicturesSlider />

        <ProductsList productsStyle={ProductsStyleMode.New} />

        <Categories />

        <ProductsList productsStyle={ProductsStyleMode.Hot} />
      </div>
    </div>
  );
};
