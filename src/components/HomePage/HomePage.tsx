import React from 'react';
import { BannerSlider } from '../Banner';
import { CardSlider } from '../CardSlider';
import { ShopCategory } from '../ShopCategory';

interface Props {
  goods: Good[];
}


export const HomePage: React.FC<Props> = ({ goods }) => {
  return (
    <>
      <BannerSlider />
      <CardSlider cards={goods.slice(0, 8)} title="Hot prices" />
      <ShopCategory cards={goods} />
      <CardSlider cards={goods.slice(0, 8)} title="Brand new models" />
    </>
  );
};
