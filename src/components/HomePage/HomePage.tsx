import styles from './HomePage.module.scss';
import { SlideBanner } from './components/PicturesSlider';
import { Categories } from './components/Categories/Categories';
import { Carousel } from '../Carousel';
import { getHotPrices, getNewModels } from '../../utils/serviceData';
import { useCallback, useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';

export const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [hotPrices, setHotPrices] = useState<Product[]>([]);
  const [newModels, setNewModels] = useState<Product[]>([]);

  const loadData = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const hotPrice = await getHotPrices();

      setHotPrices(hotPrice);

      const newModel = await getNewModels();

      setNewModels(newModel);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage onRetry={loadData} />;
  }

  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__content}>
        <h1 hidden>Product Catalog</h1>
        <h1 className={styles.homePage__title}>
          Welcome to Nice Gadgets store!
        </h1>
        <SlideBanner />

        <Carousel
          title="Brand new models"
          items={newModels}
          hasDiscount={false}
        />

        <Categories />

        <Carousel title="Hot prices" items={hotPrices} />
      </div>
    </div>
  );
};
