import React from 'react';
import { Banner } from './banner';
import { NewModel } from './newModel';
import { Category } from './categories';
import { HotPrice } from './hotPrices/hotPrice';

export const Home: React.FC = () => {
  return (
    <>
      <Banner />
      <NewModel filterName="iphone 14 pro" title={'Brand new models'} />
      <Category />
      <HotPrice />
      <NewModel sortByPriceDifference title={'Hot Prices'} />
    </>
  );
};
