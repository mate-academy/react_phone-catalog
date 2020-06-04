import React, { useState, useEffect } from 'react';
import BigSlider from './BigSlider/BigSlider';
import HotPrices from './HotPrices';
import BrandNewModels from './BrandNewModels';
import ShopByCategory from './ShopByCategory';
import { getProducts } from '../../api';
import Loader from '../loader/Loader';

const HomePage = () => {
  const [preparedPhones, setPreparedPhones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(data => setPreparedPhones(data));
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section>
      <BigSlider />
      <HotPrices preparedPhones={preparedPhones} />
      <ShopByCategory preparedPhones={preparedPhones} />
      <BrandNewModels preparedPhones={preparedPhones} />
    </section>
  );
};

export default HomePage;
