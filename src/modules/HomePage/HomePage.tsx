import { Categories } from '../../components/Categories';
import { PicturesSlider } from '../../components/PicturesSlider/PicturesSlider';
import { ProductSlider } from '../../components/ProductSlider';
import { getHotPrices } from '../../services/getHotPrices';
import { getNewModels } from '../../services/getNewModels';
import { Product } from '../../types/Product';
import style from './HomePage.module.scss';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const HomePage = () => {
  const [hotPrices, setHotPrices] = useState<Product[]>([]);
  const [newModels, setNewModels] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [hotPricesData, newModelsData] = await Promise.all([
          getHotPrices(),
          getNewModels(),
        ]);

        setHotPrices(hotPricesData);
        setNewModels(newModelsData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={style.homePage}>
      <div className={style.homePage__header}>
        <h1 style={{ visibility: 'hidden' }}>Product Catalog</h1>
        <h2 className={style.homePage__title}>
          Welcome to Nice Gadgets store!
        </h2>
        <PicturesSlider />
      </div>
      <div className={style.sliderContainer}>
        {loading ? (
          <Skeleton className={style.skeleton} />
        ) : (
          <ProductSlider
            suggestedProducts={newModels}
            title="Brand new models"
            discount={false}
          />
        )}
      </div>
      <Categories />
      <div className={style.sliderContainer}>
        {loading ? (
          <Skeleton className={style.skeleton} />
        ) : (
          <ProductSlider
            suggestedProducts={hotPrices}
            title="Hot prices"
            discount={true}
          />
        )}
      </div>
    </div>
  );
};
