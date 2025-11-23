import { useEffect, useState } from 'react';
import { PicturesSlider } from '../../shared/components/PicturesSlider';
import { ProductsSlider } from '../../shared/components/ProductsSlider';
import { ShopByCategory } from '../../shared/components/ShopByCategory';
import styles from './HomePage.module.scss';
import { Product } from '../../types/product';
import { getAllProducts } from '../../services/productsService';

export const HomePage = () => {
  const [all, setAll] = useState<Product[]>([]);

  useEffect(() => {
    async function loadAllProducts() {
      const productsFromServer = await getAllProducts();

      setAll(productsFromServer);
    }

    loadAllProducts();
  }, []);

  const brandNew = [...all].sort((a, b) => b.year - a.year).slice(0, 10);

  const hotPrices = [...all]
    .filter(p => p.fullPrice > p.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 10);

  return (
    <div className={styles.homePage}>
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <PicturesSlider />
          </div>
        </section>

        {brandNew.length > 0 && (
          <section className={styles.section}>
            <div className={styles.container}>
              <ProductsSlider title="Brand new models" products={brandNew} />
            </div>
          </section>
        )}

        <section className={styles.section}>
          <div className={styles.container}>
            <ShopByCategory />
          </div>
        </section>

        {hotPrices.length > 0 && (
          <section className={styles.section}>
            <div className={styles.container}>
              <ProductsSlider title="Hot prices" products={hotPrices} />
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
