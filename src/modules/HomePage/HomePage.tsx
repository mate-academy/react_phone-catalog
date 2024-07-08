import styles from './HomePage.module.scss';
import { useEffect, useState } from 'react';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { Product } from '../../types/Product';
import { getNewProducts, getHotPriceProducts } from '../../utils/fetchClient';
import { Loader } from '../../components/Loader/Loader';
import { BannerSlider } from '../../components/BannerSlider/BannerSlider';

export const HomePage = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const newModels = await getNewProducts();

        setNewProducts(newModels);

        const hotPrices = await getHotPriceProducts();

        setHotPriceProducts(hotPrices);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.homePage}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <BannerSlider />

          <ProductSlider products={newProducts} title="Brand new models" />

          <div>
            <ShopByCategory />
          </div>

          <ProductSlider products={hotPriceProducts} title="Hot prices" />
        </>
      )}
    </div>
  );
};
