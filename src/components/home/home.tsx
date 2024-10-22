import React from 'react';
import { Banner } from './banner';
import { NewModel } from './newModel';
import { Category } from './categories';

export const Home: React.FC = () => {
  return (
    <>
      <Banner />
      <NewModel />
      <Category />
    </>
  );
};
