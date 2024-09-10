import { Categories } from '../../components/Categories';
import { ProductSlider } from '../../components/ProductSlider';
import { Slider } from '../../components/Slider';
import { Title } from '../../components/Title';

import styles from './HomePage.module.scss';
const { homepage, homepage__content, homepage__top } = styles;

export const HomePage = () => {
  return (
    <main className={homepage}>
      <div className={homepage__content}>
        <div className={homepage__top}>
          <Title />

          <Slider />
        </div>

        <ProductSlider
          title="Brand new models"
          apiUrl="/api/products.json"
          discount={false}
          newOnly={true}
        />

        <Categories />

        <ProductSlider
          title="Hot prices"
          apiUrl="/api/products.json"
          discount={true}
          newOnly={false}
        />
      </div>
    </main>
  );
};
