import styles from './homePage.module.scss';
import { Categories } from '../Categories/Categories';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import React, { useEffect } from 'react';
import { ProductType } from '../../Helpers/enumProductType';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import Baner from '../Banner/Banner';
import { loadProducts, selectPhones } from '../../Reducers/productSlice';
import { Theme } from '../../Helpers/theme';

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
        className={
          theme === Theme.light ? styles.background : styles.backgrounddarkMode
        }
      >
        <div className={styles.homeWrapper}>
          <section className={styles.appBody}>
            <h1
              className={
                theme === Theme.light
                  ? styles.mainTitles
                  : styles.mainTitlesdarkMode
              }
            >
              Welcome to Nice Gadgets store!
            </h1>
            <div className={styles.bannerContainer}>
              <Baner />
            </div>
            <div className={styles.poductSliderContainer}>
              <ProductSlider title="Brand new models" phones={newModels} />
            </div>
            <Categories />
            <div className={styles.poductSliderContainer}>
              <ProductSlider title="Hot prices" phones={hotPrices} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
