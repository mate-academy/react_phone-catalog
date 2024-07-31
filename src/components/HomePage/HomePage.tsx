import { useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from '../../Root';
import { SliderProduct } from '../../types/SliderProduct';
import { getSliderProducts } from '../../utils/fetchClient';
import { getBrandNewProducts } from '../../utils/getBrandNewProducts';
import { getHotPricesProducts } from '../../utils/getHotPricesProducts';
import { PicturesSlider } from '../PicturesSlider';
import { ProductsSlider } from '../ProductsSlider';
import { ShopByCategory } from '../ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<SliderProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { updatedAt } = useContext(AppContext);

  const brandNewProducts = useMemo(
    () => getBrandNewProducts(products),
    [products],
  );

  const hotPricesProducts = useMemo(
    () => getHotPricesProducts(products),
    [products],
  );

  useEffect(() => {
    setLoading(true);

    getSliderProducts()
      .then(setProducts)
      .catch(() => setErrorMessage('Oops! Something went wrong.'))
      .finally(() => setLoading(false));
  }, [updatedAt]);

  return (
    <div className={styles.homePage}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <PicturesSlider />

      <ProductsSlider
        title="Brand new models"
        products={brandNewProducts}
        loading={loading}
        errorMessage={errorMessage}
        updateErrorMessage={setErrorMessage}
        discountHidden={true}
      />

      <ShopByCategory />

      <ProductsSlider
        title="Hot prices"
        products={hotPricesProducts}
        loading={loading}
        errorMessage={errorMessage}
        updateErrorMessage={setErrorMessage}
      />
    </div>
  );
};
