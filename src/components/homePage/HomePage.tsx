import React, { useEffect, useState } from 'react';
import HomeSlider from './HomeSlider/HomeSlider';
import { getProducts } from '../../helpers/api';
import HotPrices from './HotPrices/HotPrices';
import ShopByCategory from './ShopByCategory/ShopByCategory';
import BrandNewModels from './BrandNewModels/BrandNewModels';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phonesFromServer, setPhonesFromServer] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    getProducts().then(data => setPhonesFromServer(data));

    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div>
      <HomeSlider />

      <HotPrices gadgets={phonesFromServer} />

      <ShopByCategory gadgets={phonesFromServer} />

      <BrandNewModels gadgets={phonesFromServer} />
    </div>
  );
};

export default HomePage;
