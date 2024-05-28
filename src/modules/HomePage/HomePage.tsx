import { useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';

import {
  getBrandNewProducts,
  getHotPriceProducts,
} from '../../shared/httpClient';

import { Carousel } from './components/Carousel';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from './components/ShopByCategory';

import classes from './HomePage.module.scss';

export const HomePage = () => {
  const { products } = useContext(GlobalContext);

  const hotPriceList = getHotPriceProducts(products);
  const brandNewList = getBrandNewProducts(products);

  return (
    <div className={classes.HomePage}>
      <section className={classes.HomePage__top}>
        <h1 className={classes.HomePage__title}>
          Welcome to Nice Gadgets store!
        </h1>

        <Carousel />
      </section>

      <ProductsSlider title="Brand new models" items={brandNewList} />

      <ShopByCategory />

      <ProductsSlider title="Hot prices" items={hotPriceList} />
    </div>
  );
};
