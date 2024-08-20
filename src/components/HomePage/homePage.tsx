import styles from './homePage.module.scss';
import { Categories } from '../Categories/Categories';
import React, { useEffect } from 'react';
import { ProductType } from '../../Helpers/enumProductType';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import Baner from '../Banner/Banner';
import { loadProducts } from '../../Reducers/productSlice';
import { Theme } from '../../Helpers/theme';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { motion } from 'framer-motion';

export const HomePage: React.FC = () => {
  const theme = useAppSelector(state => state.theme.theme);
  const dispatch = useAppDispatch();
  const phonesSlider = useAppSelector(state => state.phones.products);

  const newModels = phonesSlider.filter(
    item => item.year === 2022 && item.category === ProductType.phones,
  );

  const hotPrices = phonesSlider.filter(
    item => item.price < item.fullPrice && item.category === ProductType.phones,
  );

  useEffect(() => {
    dispatch(loadProducts(ProductType.phones));
  }, [dispatch]);

  const animationVariants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={animationVariants}
        transition={{ duration: 0.5 }}
      >
        <div
          className={
            theme === Theme.light
              ? styles.background
              : styles.backgrounddarkMode
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
      </motion.div>
    </>
  );
};

export default React.memo(HomePage);
