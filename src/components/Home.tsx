import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';

import { Phones } from '../interfaces/interfaces';
import {
  RootState,
  loadPhones,
  getHotPricePhones,
  getBrandNewPhones,
} from '../store';

import Slider from './Slider';
import Title from './Title';
import ProductSlider from './ProductSlider';
import Category from './Category';

type Props = {
  phonesLoad: () => void;
  hotPricePhones: Phones[];
  brandNewPhones: Phones[];
};

const Home: FC<Props> = ({ phonesLoad, hotPricePhones, brandNewPhones }) => {
  useEffect(() => {
    phonesLoad();
  }, [phonesLoad]);

  return (
    <div className="home">
      <Slider />
      <div className="home__slider-wrapper">
        <Title title="Hot Prices" />
        <ProductSlider phones={hotPricePhones} />
      </div>
      <Title title="Shop by category" />
      <Category />
      <div className="home__slider-wrapper">
        <Title title="Brand new models" />
        <ProductSlider phones={brandNewPhones} />
      </div>
    </div>
  );
};

const mapState = (state: RootState) => ({
  hotPricePhones: getHotPricePhones(state),
  brandNewPhones: getBrandNewPhones(state),
});

const mapDispatch = {
  phonesLoad: loadPhones,
};

export default connect(mapState, mapDispatch)(Home);
