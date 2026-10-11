import styles from './HomePage.module.scss';

import { useState } from 'react';

import { BannerSlider } from '../../components/BannerSlider';
import { NewModels } from '../../components/NewModels';
import { ShopByCategory } from '../../components/ShopByCategory';
import { HotPrices } from '../../components/HotPrices';

export const HomePage = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      {hasError ? (
        <p>Error ao carregar a página</p>
      ) : (
        <div className={styles.homePage}>
          <h1 hidden>Product Catalog</h1>

          <h1 className={styles.homePage__title}>
            Welcome to Nice Gadgets store!
          </h1>

          <BannerSlider isLoading={isLoading} />

          <NewModels
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setHasError={setHasError}
          />

          <ShopByCategory
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setHasError={setHasError}
          />

          <HotPrices
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setHasError={setHasError}
          />
        </div>
      )}
    </>
  );
};
