import React from 'react';
import { Helmet } from 'react-helmet';

import { BannerSlider } from '../Banner';
import { CardSlider } from '../CardSlider';
import { sldierFilter } from '../../helpers';
import { ShopCategory } from '../ShopCategory';

interface Props {
  goods: Good[];
}

export const HomePage: React.FC<Props> = ({ goods }) => {
  const hotPrices = sldierFilter(goods, 'hotPrice');
  const highPrices = sldierFilter(goods, 'newModels');

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
