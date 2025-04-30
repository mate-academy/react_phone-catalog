import BanerSlider from "./components/BanerSlider";
import HotPrice from "./components/HotPrice";
import NewModelsSlider from "./components/NewModelsSlider";
import ShopByCategory from "./components/ShopByCategory";
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <BanerSlider />

      <NewModelsSlider />

      <ShopByCategory />

      <HotPrice />
    </div>
  );
};

export default HomePage;
