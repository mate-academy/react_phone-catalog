import { Categories } from './components/Categories';
import { HotPrices } from './components/HotPrices';
import { NewModels } from './components/NewModels';
import { Welcome } from './components/Welcome';
import styles from './HomePage.module.scss';

export const HomePage = () => (
  <div className={styles.homePage}>
    <h1 className={styles.homePage__title}>Product Catalog</h1>
    <Welcome />
    <NewModels />
    <Categories />
    <HotPrices />
  </div>
);
