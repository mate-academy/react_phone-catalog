import React, { useEffect, useMemo, useState } from 'react';
import { CategorySlider } from '../components/CategorySlider';
import { ProductSlider } from '../components/ProductsSlider';
import { ShopCategory } from '../components/ShopCategory';
import { useWindowWidth } from '../hooks/useWindowWidth';

import { getPhonesList } from '../api';
import { Phone } from '../types/Phone';
import { CategoryWidth } from '../types/CategoryWidth';
import { SliderSizes } from '../types/SliderSizes';

export const HomePage: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const windowWidth = useWindowWidth();

  const categorySliderWidth = useMemo(() => {
    return windowWidth < CategoryWidth.desc
      ? CategoryWidth.tablet
      : CategoryWidth.desc;
  }, [windowWidth]);

  const productWidth: SliderSizes = useMemo(() => {
    return windowWidth < CategoryWidth.desc
      ? {
        element: 220,
        interval: 10,
        items: 3,
      }
      : {
        element: 272,
        interval: 16,
        items: 4,
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
      <ShopCategory phonesNumber={phones.length} />
      <ProductSlider
        title="Brand new models"
        phones={newPhonesSorted}
        width={productWidth}
      />
    </main>
  );
};
