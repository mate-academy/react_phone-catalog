import React, { useEffect, useMemo, useState } from 'react';
import { CategorySlider } from '../components/CategorySlider';
import { ProductSlider } from '../components/ProductsSlider';
import { ShopCategory } from '../components/ShopCategory';
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
      />
      <ShopCategory phonesNumber={phones.length} />
      <ProductSlider
        title="Brand new models"
        phones={newPhonesSorted}
      />
    </main>
  );
};
