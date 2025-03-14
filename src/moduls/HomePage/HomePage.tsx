import { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import { HomeBanner } from './components/HomeBanner';
import { ShopCategory } from './components/ShopCategory';
import { Loader } from '../../shared/components/Loader';
import { BrandNewModel } from './components/BrandNewModel';
import { HotPrices } from './components/HotPrices';

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="">
      <div className="page-container">
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <h1 className={styles.main__title}>
              Welcome to Nice Gadgets store!
            </h1>
            <div className={styles.main__content}>
              <HomeBanner />
              <BrandNewModel />
              <ShopCategory />
              <HotPrices />
            </div>
          </>
        )}
      </div>
    </main>
  );
};
