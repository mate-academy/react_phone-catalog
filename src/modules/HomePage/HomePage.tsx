// eslint-disable-next-line max-len
import { ProductsCategory } from './components/ProductsCategory/ProductsCategory';
import { ProductsSlider } from './components/ProductsSlider/ProductsSlider';
import {
  getBrandNewProducts,
  getHotPriceProducts,
} from 'modules/shared/services/services';
import { PicturesSlider } from './components/BannerSlider/PicturesSlider';
import styles from './HomePage.module.scss';
import { Product } from 'modules/shared/types/Product';
import { useEffect, useState } from 'react';
import { Loader } from 'modules/shared/components/Loader';

export const HomePage: React.FC = () => {
  const [newModels, setNewModels] = useState<Product[]>([]);
  const [hotPrices, setHotPrices] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedNewModels = await getBrandNewProducts();
        const fetchedHotPrices = await getHotPriceProducts();

        setNewModels(fetchedNewModels);
        setHotPrices(fetchedHotPrices);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.homepage}>
      <div className={styles.section}>
        <h1 hidden>Product Catalog</h1>
        <h1 className={styles.mainTitle}>Welcome to Nice Gadgets store!</h1>
        <PicturesSlider />
      </div>

      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <div className={styles.section}>
            <ProductsSlider
              title={'Brand new models'}
              products={newModels}
              showDiscount={false}
            />
          </div>

          <div className={styles.section}>
            <ProductsCategory />
          </div>

          <div className={styles.section}>
            <ProductsSlider
              title={'Hot prices'}
              products={hotPrices}
              showDiscount={true}
            />
          </div>
        </>
      )}
    </div>
  );
};
