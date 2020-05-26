import React from 'react';
import { Helmet } from 'react-helmet';

import { BannerSlider } from '../Banner';
import { CardSlider } from '../CardSlider';
import { sliderFilter, SLIDER_FILTER_TYPE } from '../../helpers';
import { ShopCategory } from '../ShopCategory';

interface Props {
  goods: Good[];
}

export const HomePage: React.FC<Props> = ({ goods }) => {
  const hotPrices = sliderFilter(goods, SLIDER_FILTER_TYPE.hotPrice, '');
  const highPrices = sliderFilter(goods, SLIDER_FILTER_TYPE.newModels, '');

  return (
    <>
      <Helmet>
        <title>Phone Store</title>
      </Helmet>
      <BannerSlider />
      <CardSlider goods={hotPrices} title="Hot prices" />
      <ShopCategory goods={goods} />
      <CardSlider goods={highPrices} title="Brand new models" />
    </>
  );
};
