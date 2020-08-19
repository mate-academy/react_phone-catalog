import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';

import Slider from './Slider';
import Title from './Title';
import ProductSlider from './ProductSlider';
import Category from './Category';

import { getPhones } from '../api';
import { Phones } from '../interfaces/interfaces';
import {
  setPhones,
  getHotPriceProducts,
  getBrandNewProducts,
  RootState,
} from '../store';

type Props = {
  phonesSetter: (phones: Phones[]) => void;
  hotPricePhones: Phones[];
  brandNewPhones: Phones[];
};

const Home: FC<Props> = ({ phonesSetter, hotPricePhones, brandNewPhones }) => {
  const getAllPhones = async () => {
    const phones = await getPhones<Phones>();

    phonesSetter(phones);
  };

  useEffect(() => {
    getAllPhones();
  });

  return (
    <div>
      <Slider />
      <Title title="Hot Prices" />
      <ProductSlider phones={hotPricePhones} />
      <Title title="Shop by category" />
      <Category />
      <Title title="Brand new models" />
      <ProductSlider phones={brandNewPhones} />
    </div>
  );
};

const mapState = (state: RootState) => ({
  hotPricePhones: getHotPriceProducts(state),
  brandNewPhones: getBrandNewProducts(state),
});

const mapDispatch = {
  phonesSetter: setPhones,
};

export default connect(mapState, mapDispatch)(Home);
