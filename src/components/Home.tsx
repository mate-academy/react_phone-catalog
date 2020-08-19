import React, { FC } from 'react';
import { connect } from 'react-redux';

import { Phones } from '../interfaces/interfaces';
import {
  getHotPriceProducts,
  getBrandNewProducts,
  RootState,
  loadPhones,
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

const Home: FC<Props> = ({
  phonesLoad, hotPricePhones, brandNewPhones,
}) => {
  return (
    <div>
      <button type="button" onClick={phonesLoad}>Go</button>
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
  phonesLoad: loadPhones,
};

export default connect(mapState, mapDispatch)(Home);
