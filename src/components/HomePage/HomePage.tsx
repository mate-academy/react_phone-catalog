/* eslint-disable import/no-extraneous-dependencies */
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { themeClass } from '../../utils/themeClass';
import React from 'react';
import './HomePage.scss';
import { ProductAd } from './ProductAd/ProductAd';
import { NewModelsList } from './NewModelsList/NewModelsList';
import { Categories } from './Categories/Categories';
import { HotPricesList } from './HotPricesList/HotPricesList';

export const HomePage = () => {
  const { light } = useContext(ThemeContext);

  const getClassName = themeClass(light);

  return (
    <main className={getClassName('homePage')}>
      <h1 className={getClassName('homePage__header')}>
        Welcome to Nice Gadgets store!
      </h1>

      <ProductAd />

      <NewModelsList />

      <Categories />

      <HotPricesList />
    </main>
  );
};
