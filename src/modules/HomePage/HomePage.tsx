import { Hero } from './components/Hero';
import styles from './HomePage.module.scss';
import { ShopCategory } from './components/ShopCategory';
import { SuggestionsSlider } from '../../components/SuggestionsSlider';

import { newPhoneModels } from '../../constants/newPhoneModels';
import { hotPricesPhones } from '../../constants/hotPrices';
import { SliderTitle } from '../../types/SliderTitle';

export const HomePage = () => {
  return (
    <div className={styles.hero}>
      <Hero />
      <SuggestionsSlider
        productList={newPhoneModels}
        title={SliderTitle.newModels}
      />
      <ShopCategory />
      <SuggestionsSlider
        productList={hotPricesPhones}
        title={SliderTitle.hotPrices}
        isDiscount={true}
      />
    </div>
  );
};
