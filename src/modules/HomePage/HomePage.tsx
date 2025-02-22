/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { HeroSection } from './components/HeroSection';
import { Models } from './components/Models';
import { Categories } from './components/Categories';
import { HOT_PRICES_TITLE, MODELS_TITLE } from './constants/ProductTitle';

export const HomePage: React.FC = () => {
  return (
    <main>
      <HeroSection />
      <Models title={MODELS_TITLE} />
      <Categories />
      <Models title={HOT_PRICES_TITLE} />
    </main>
  );
};
