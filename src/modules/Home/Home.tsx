import { useEffect } from 'react';

import { UseHooks } from '../../AppHooks';
import { Categories } from '../../components/Categories';
import { CardScroller } from '../../components/CardScroller';
import { Slider } from '../../components/Slider';
import './Home.module.scss';
import products from '../../../public/api/products.json';
import styles from './Home.module.scss';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const {
    setAllProducts,
    setNewProducts,
    allProducts,
    newProducts,
    hotProducts,
    setHotProducts,
    currentDevice,
  } = UseHooks();

  const navigate = useNavigate();

  useEffect(() => {
    setAllProducts(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentDevice) {
      navigate(`/${currentDevice.category}/productId=${currentDevice.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDevice]);

  useEffect(() => {
    //Setting new products
    const sorted = [...allProducts].sort(
      (item1, item2) => item2.year - item1.year,
    );
    const maxYear = sorted[0]?.year;
    const colors: string[] = [];
    const newest = sorted.filter(item => {
      if (item.year === maxYear && !colors.includes(item.color)) {
        colors.push(item.color);

        return item;
      } else {
        return;
      }
    });

    setNewProducts(newest);
    //Setting products with discount
    const hottestProducts = [...allProducts].sort((prod1, prod2) => {
      const deltaPrice1 = prod1.fullPrice - prod1.price;
      const deltaPrice2 = prod2.fullPrice - prod2.price;

      return deltaPrice2 - deltaPrice1;
    });

    setHotProducts(hottestProducts.slice(0, 30));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts]);

  return (
    <>
      <h1 className={classNames(styles.headerText, 'inlineContainer')}>
        Welcome to Nice Gadgets store!
      </h1>
      <Slider />
      <CardScroller items={newProducts} name={'new'} />
      <Categories />
      <CardScroller items={hotProducts} name={'discounts'} />
    </>
  );
};
