import { Hero } from './components/Hero';
import styles from './HomePage.module.scss';
import { ShopCategory } from './components/ShopCategory';
import { SuggestionsSlider } from '../../components/SuggestionsSlider';

import { newPhoneModels } from '../../constants/newPhoneModels';
import { SliderTitle } from '../../types/SliderTitle';
import { getUniqueItems } from '../../utils/getUniqueItems';
import phones from '../../../public/api/phones.json';

export const HomePage = () => {
  const uniquePhones = getUniqueItems(phones);

  const hotPricesPhones = uniquePhones
    .filter(phone => !phone.name.includes('iPhone 14'))
    .slice(0, 7);

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
      />
    </div>
  );
};
