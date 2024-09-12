import { FC } from 'react';

import { Banner } from './banner/Banner';
import { NewModels } from './new-models/NewModels';
import { Category } from './category/Category';
import { HotPrice } from './hot-price/HotPrice';

export const Home: FC = () => {
  return (
    <>
      <Banner />
      <NewModels />
      <Category />
      <HotPrice />
    </>
  );
};
