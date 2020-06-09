import React from 'react';

import { ProductCategories } from '../../components/ProductCategories';
import { Slider } from './../../components/Slider';
import { CardSlider } from '../../components/CardSlider/CardSlider';
import { useSelector } from 'react-redux';
import { getGoods } from '../../store/index';

export const Home = () => {
  const goods: Good[] = useSelector(getGoods);
  const hotPriceModels = goods.sort((a, b) => b.discount - a.discount);
  const newestModels = goods.sort((a, b) => b.age - a.age);

  return (
  <div className="homepage">
    <Slider />
    <CardSlider goods={hotPriceModels} title={`Hot prices`} />
    <ProductCategories goods={goods} />
    <CardSlider goods={newestModels} title={`Brand new models`} />
   </div>
  )
}

