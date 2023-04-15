import React from 'react';
import { CategorySlider } from '../components/CategorySlider';
import { ProductsSlider } from '../components/ProductsSlider';
import { ShopCategory } from '../components/ShopCategory';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';

import { CategoryWidth } from '../types/CategoryWidth';
import { usePhones } from '../hooks/usePhones';

export const HomePage: React.FC = () => {
  const { phones, isErrorPhones, isPhonesLoading } = usePhones();
  const windowWidth = useWindowWidth();

  const categorySliderWidth = windowWidth < CategoryWidth.desc
    ? CategoryWidth.tablet
    : CategoryWidth.desc;

  const discauntPhones = phones.filter(phone => phone.year < 2019);
  const newModelPhones = phones.filter(phone => phone.year === 2019);
  const newPhonesSorted = [...newModelPhones].sort((a, b) => b.price - a.price);

  return isPhonesLoading
    ? (
      <Loader />
    ) : (
      <main className="home-page">
        <Error isError={isErrorPhones} />
        {!isErrorPhones && <CategorySlider sliderWidth={categorySliderWidth} />}
        <ProductsSlider
          title="Hot prices"
          phones={discauntPhones}
        />
        <ShopCategory phonesNumber={phones.length} />
        <ProductsSlider
          title="Brand new models"
          phones={newPhonesSorted}
        />
      </main>
    );
};
