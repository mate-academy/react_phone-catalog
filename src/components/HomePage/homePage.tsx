import styles from './homePage.module.scss';
import { Baner } from '../Banner/banner';
import { Categories } from '../categories/Categories';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import React, { useEffect } from 'react';
import {
  loadProducts,
  selectPhones,
} from '../../feachers/goodsPhoneSlice/productSlice';
import { ProductType } from '../../services/enums';
import { ProductSlider } from '../ProductSlider/ProductSlider';

export const HomePage: React.FC = () => {
  const phonesState = useAppSelector(selectPhones);
  const dispatch = useAppDispatch();

  const phones = phonesState;
  const newModels = phones.filter(phone => phone.year === 2022);
  const hotPrices = phones.filter(phone => phone.price < phone.fullPrice);

  useEffect(() => {
    dispatch(loadProducts(ProductType.phones));
  }, []);

  return (
    <>
      <div className={styles.homeWrapper}>
        <section className={styles.appBody}>
          <h1 className={styles.mainTitles}>Welcome to Nice Gadgets store!</h1>
          <Baner />
          <ProductSlider title="Brand new models" phones={newModels} />
          <Categories />
          <ProductSlider title="Hot prices" phones={hotPrices} />
        </section>
      </div>
    </>
  );
};
