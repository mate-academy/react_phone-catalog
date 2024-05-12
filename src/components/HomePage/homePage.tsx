import styles from './homePage.module.scss';
import { Categories } from '../Categories/Categories';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import React, { useEffect } from 'react';
import { ProductType } from '../../services/enums';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import Baner from '../Banner/Banner';
import { loadProducts, selectPhones } from '../../feachers/productSlice';
import { Theme } from '../../services/theme';

export const HomePage: React.FC = () => {
  const phonesState = useAppSelector(selectPhones);
  const theme = useAppSelector(state => state.theme.theme);
  const dispatch = useAppDispatch();

  const phones = phonesState;
  const newModels = phones.filter(phone => phone.year === 2022);
  const hotPrices = phones.filter(phone => phone.price < phone.fullPrice);

  useEffect(() => {
    dispatch(loadProducts(ProductType.phones));
  }, []);

  return (
    <>
      <div
        className={Theme.light ? styles.background : styles.backgrounddarkMode}
      >
        <div className={styles.homeWrapper}>
          <section className={styles.appBody}>
            <h1
              className={!theme ? styles.mainTitles : styles.mainTitlesdarkMode}
            >
              Welcome to Nice Gadgets store!
            </h1>
            <Baner />
            <ProductSlider title="Brand new models" phones={newModels} />
            <Categories />
            <ProductSlider title="Hot prices" phones={hotPrices} />
          </section>
        </div>
      </div>
    </>
  );
};
