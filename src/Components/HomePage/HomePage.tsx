import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import styles from './HomePage.module.scss';
import { Slider } from '../Slider';
import { SwiperSection } from '../SwiperSection';
import { Product } from '../../types/Product';
import { ShopByCategorySection } from '../ShopByCategorySection';

export const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newPhones, setNewPhones] = useState<Product[]>([]);
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  const [totalPhoneModels, setTotalPhoneModels] = useState(0);
  const [totalTabletsModels, setTotalTabletsModels] = useState(0);
  const [totalAccessoriesModels, setTotalAccessoriesModels] = useState(0);

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

        const allPhoneModels = data.filter(
          phone => phone.category === 'phones',
        ).length;

        const allTabletsModels = data.filter(
          tablet => tablet.category === 'tablets',
        ).length;

        const allAccessoriesModels = data.filter(
          accessory => accessory.category === 'accessories',
        ).length;

        setNewPhones(newModels);
        setDiscountedProducts(hotPrices);
        setTotalPhoneModels(allPhoneModels);
        setTotalTabletsModels(allTabletsModels);
        setTotalAccessoriesModels(allAccessoriesModels);
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

      <ShopByCategorySection
        title="Shop By Category"
        totalPhoneModels={totalPhoneModels}
        totalTabletsModels={totalTabletsModels}
        totalAccessoriesModels={totalAccessoriesModels}
      />

      <SwiperSection title="Hot Prices" products={discountedProducts} />
    </div>
  );
};
