import React, { useEffect, useMemo, useState } from 'react';
import { CategorySlider } from '../components/CategorySlider';
import { ProductsSlider } from '../components/ProductsSlider';
import { ShopCategory } from '../components/ShopCategory';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';

import { getPhonesList } from '../api';
import { Phone } from '../types/Phone';
import { CategoryWidth } from '../types/CategoryWidth';

export const HomePage: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const windowWidth = useWindowWidth();

  const categorySliderWidth = useMemo(() => {
    return windowWidth < CategoryWidth.desc
      ? CategoryWidth.tablet
      : CategoryWidth.desc;
  }, [windowWidth]);

  const fetchProcess = (api: Phone[]) => {
    setIsFetching(false);
    setIsError(false);
    setPhones(api);
  };

  const errorProcess = () => {
    setIsFetching(false);
    setIsError(true);
  };

  useEffect(() => {
    setIsFetching(true);

    getPhonesList()
      .then(resolve => fetchProcess(resolve))
      .catch(errorProcess);
  }, []);

  const discauntPhones = phones.filter(phone => phone.year < 2019);
  const newModelPhones = phones.filter(phone => phone.year === 2019);
  const newPhonesSorted = [...newModelPhones].sort((a, b) => b.price - a.price);

  return isFetching
    ? (
      <Loader />
    ) : (
      <main className="home-page">
        <Error isError={isError} />
        {!isError && <CategorySlider sliderWidth={categorySliderWidth} />}
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
