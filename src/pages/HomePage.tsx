import React, { useEffect, useMemo, useState } from 'react';
import { CategorySlider } from '../components/CategorySlider';
import { ProductSlider } from '../components/ProductsSlider';
import { useWindowWidth } from '../hooks/useWindowWidth';

import { getPhonesList } from '../api';
import { Phone } from '../types/Phone';
import { CategoryWidth } from '../types/CategoryWidth';

export const HomePage: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const windowWidth = useWindowWidth();

  const categorySliderWidth = useMemo(() => {
    return windowWidth < CategoryWidth.desc
      ? CategoryWidth.tablet
      : CategoryWidth.desc;
  }, [windowWidth]);

  const productWidth: ProductWidth = useMemo(() => {
    return windowWidth < CategoryWidth.desc
      ? {
        slider: CategoryWidth.tablet + 80,
        element: 220,
        interval: 10,
      }
      : {
        slider: CategoryWidth.desc + 96,
        element: 272,
        interval: 16,
      };
  }, [windowWidth]);

  useEffect(() => {
    getPhonesList()
      .then(resolve => setPhones(resolve));
  }, []);

  const discauntPhones = phones.filter(phone => phone.year < 2019);
  const newModelPhones = phones.filter(phone => phone.year === 2019);
  const newPhonesSorted = [...newModelPhones].sort((a, b) => b.price - a.price);

  return (
    <main className="home-page">
      <CategorySlider sliderWidth={categorySliderWidth} />
      <ProductSlider
        title="Hot prices"
        phones={discauntPhones}
        width={productWidth}
      />
      <ProductSlider
        title="Brand new models"
        phones={newPhonesSorted}
        width={productWidth}
      />
    </main>
  );
};
