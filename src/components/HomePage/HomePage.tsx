import React from 'react';
import { BannerSlider } from '../Banner';
import { CardSlider } from '../CardSlider';
import { sldierFilter } from '../../helpers';

interface Props {
  goods: Good[];
}


export const HomePage: React.FC<Props> = ({ goods }) => {
  const hotPrices = sldierFilter(goods, 'hotPrice');
  const highPrices = sldierFilter(goods, 'highPrices');

  return (
    <>
      <BannerSlider />
      <CardSlider cards={hotPrices} title="Hot prices" />
      <CardSlider cards={highPrices} title="Brand new models" />
    </>
  );
};
