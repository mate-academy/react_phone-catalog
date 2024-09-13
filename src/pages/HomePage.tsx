import React, { useEffect, useState } from 'react';
import { Phone } from '../types/phone';
import { BrandNewModelsHome } from '../components/BrandNewModelsHome';
import { ShopByCategory } from '../components/ShopByCategory';
import { HomeCarousel } from '../components/HomeCarousel';

export const HomePage = () => {
  const [newModels, setNewModels] = useState<Phone[]>([]);

  useEffect(() => {
    fetch('./api/phones.json')
      .then(response => response.json())
      .then(data => {
        const firstFiveModels = data.slice(10, 15);

        setNewModels(firstFiveModels);
      });
  }, []);

  return (
    <>
      <HomeCarousel />

      <BrandNewModelsHome newModels={newModels} type="Brand new models" />

      <ShopByCategory />

      <BrandNewModelsHome newModels={newModels} type="Hot Prices" />
    </>
  );
};
