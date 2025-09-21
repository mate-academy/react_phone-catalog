import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import styles from './HomePage.module.scss';
import { Slider } from '../Slider';
import { SwiperSection } from '../SwiperSection';
import { Product } from '../../types/Product';

export const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newPhones, setNewPhones] = useState<Product[]>([]);
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('api/products.json')
      .then(res => res.json())
      .then((data: Product[]) => {
        const newModels = data
          .filter(phone => phone.year === 2022)
          .sort(() => Math.random() - 0.5)
          .slice(0, 12);

        const hotPrices = data
          .filter(models => models.year < 2021)
          .sort(() => Math.random() - 0.5)
          .slice(0, 12);

        setNewPhones(newModels);
        setDiscountedProducts(hotPrices);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      <Slider />
      <SwiperSection title="Brand New Models" products={newPhones} />
    </div>
  );
};
