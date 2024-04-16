import { useEffect } from 'react';
import styles from './HomePage.module.scss';

import { useAppDispatch, useAppSelector } from '../../app/hook';
import { BannerSlider } from './components/BannerSlider';
import { ProductSlider } from './components/ProductSlider';
import { ProductCategories } from './components/ProductCategories';
import { getNewModels } from '../../helpers/getNewModels';
import { getHotPrices } from '../../helpers/getHotPrices';
import { fetchProducts } from '../../features/productsSlice';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { phones, tablets, accessories, loading } = useAppSelector(
    state => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const newModels = getNewModels(phones);
  const hotPrice = getHotPrices(phones);

  return (
    <>
      <h1 className={styles.h1}>Welcome to Nice Gadgets store!</h1>

      <div className={styles.pageStructure}>
        <BannerSlider />

        <ProductSlider
          title={`Brand new \n models`}
          products={newModels}
          type="Brand new models"
          loading={loading}
        />

        <ProductCategories
          phones={phones}
          tablets={tablets}
          accessories={accessories}
        />

        <ProductSlider
          title={'Hot prices'}
          products={hotPrice}
          type="Hot prices"
          loading={loading}
        />
      </div>
    </>
  );
};
