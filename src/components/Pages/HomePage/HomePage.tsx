import styles from './HomePage.module.scss';
import { Carousel } from './components/Carousel/Carousel';
import { Sliders } from '../../shared/Slider/Slider';
import { GlobalContext } from '../../shared/GlobalContext/GlobalContext';
import { useContext, useMemo } from 'react';
import { SliderTitle } from '../../../type/SliderTitle';
import { Product } from '../../../type/Product';
import { ShopCategory } from './components/ShopCategory/ShopCategory';

export const HomePage = () => {
  const { products } = useContext(GlobalContext);

  const phones = products.filter(product => product.category === 'phones');
  const newestPhones = useMemo(
    () =>
      phones
        .filter(product => product.year === 2022 || product.year === 2020)
        .slice(0, 36),
    [phones],
  );
  const bigDiscountPhones = useMemo(
    () =>
      phones
        .sort(
          (product1, product2) =>
            product2.fullPrice -
            product2.price -
            (product1.fullPrice - product1.price),
        )
        .slice(0, 36),
    [phones],
  );

  const selectRandomlyEveryThird = (product: Product[]) => {
    const selectedProduct = [];

    for (let i = 0; i < product.length; i += 3) {
      const endIndex = Math.min(i + 3, product.length);
      const randomIndex = Math.floor(Math.random() * (endIndex - i)) + i;

      selectedProduct.push(product[randomIndex]);
    }

    return selectedProduct;
  };

  const selectedNewestPhones = useMemo(
    () => selectRandomlyEveryThird(newestPhones),
    [],
  );

  const selectedBigDiscountPhones = useMemo(
    () => selectRandomlyEveryThird(bigDiscountPhones),
    [],
  );

  return (
    <div className={styles.Home}>
      <h1 hidden>Product Catalog</h1>
      <Carousel />
      <Sliders
        titleName={SliderTitle.newModels}
        products={selectedNewestPhones}
      />

      <ShopCategory />

      <Sliders
        titleName={SliderTitle.hotPrices}
        products={selectedBigDiscountPhones}
      />
    </div>
  );
};
