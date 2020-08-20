import React, { Component } from 'react';
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

class Home extends Component<Props> {
  componentDidMount() {
    this.props.phonesLoad();
  }

  render() {
    return (
      <div className="home">
        <Slider />
        <div className="home__slider-wrapper">
          <Title title="Hot Prices" />
          <ProductSlider phones={this.props.hotPricePhones} />
        </div>
        <Title title="Shop by category" />
        <Category />
        <div className="home__slider-wrapper">
          <Title title="Brand new models" />
          <ProductSlider phones={this.props.brandNewPhones} />
        </div>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  hotPricePhones: getHotPriceProducts(state),
  brandNewPhones: getBrandNewProducts(state),
});

const mapDispatch = {
  phonesLoad: loadPhones,
};

export default connect(mapState, mapDispatch)(Home);
