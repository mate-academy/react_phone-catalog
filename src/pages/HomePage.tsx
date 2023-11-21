import React, { useMemo } from 'react';
import { Slider } from '../components/Slider/Slider';
import { ProductsSlider } from '../components/ProductsSlider/ProductsSlider';
import { Phone } from '../type/Phone';
import { Categories } from '../components/Categories/Categories';
import { Loader } from '../components/Loader/Loader';

type Props = {
  phones: Phone[];
  isLoading: boolean;
};

export const HomePage: React.FC<Props> = ({ phones, isLoading }) => {
  const NewPhones = useMemo(() => {
    return phones.filter(phone => phone.year === 2019)
      .sort((a, b) => b.fullPrice - a.fullPrice);
  }, [phones]);

  const hotPhones = useMemo(() => {
    return phones.filter(phone => phone.fullPrice < 1200)
      .sort((a, b) => b.fullPrice - a.fullPrice);
  }, [phones]);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <main className="homePage">
      <div className="container">
        <Slider />
        <ProductsSlider title="Hot prices" phones={hotPhones} />
        <Categories phones={phones} />
        <ProductsSlider title="Brand new models" phones={NewPhones} />
      </div>
    </main>
  );
};
