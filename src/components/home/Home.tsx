import { FC } from 'react';

import { Banner, Categories, HotPrice, NewModels } from './index';

export const Home: FC = () => {
  return (
    <>
      <h1 className="visually-hidden">Product Catalog</h1>
      <Banner />
      <NewModels />
      <Categories />
      <HotPrice />
    </>
  );
};
