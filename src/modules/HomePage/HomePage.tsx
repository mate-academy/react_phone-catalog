import styles from './HomePage.module.scss';
import { Product } from '../../types';
import { useEffect, useState } from 'react';
import { ProductsSlider } from '../shared/ProductsSlider/ProductsSlider';
import getProducts from '../../api/products';
import { ShopByCategory } from '../shared/ShopByCategory/ShopByCategory';
import { BannerSlider } from '../shared/BannerSlider/BannerSlider';

export const HomePage = () => {
  const [newModels, setNewModels] = useState<Product[]>([]);
  const [hotModels, setHotModels] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const all = await getProducts();
        const newest = [...all].sort((a, b) => b.year - a.year).slice(0, 8);
        const hottest = [...all]
          .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
          .slice(0, 8);

        setNewModels(newest);
        setHotModels(hottest);
      } catch {
        // failed to load products
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="container">
      <h1 className="visually-hidden">Product Catalog</h1>

      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

      <div className={styles.content}>
        <BannerSlider />

        <ProductsSlider
          title="Brand new models"
          products={newModels}
          loading={loading}
        />

        <ShopByCategory />

        <ProductsSlider
          title="Hot prices"
          products={hotModels}
          loading={loading}
        />
      </div>
    </div>
  );
};
