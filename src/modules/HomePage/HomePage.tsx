import React from 'react';

import { Header } from '../../components/Header/Header';
import { HeroSection } from './components/HeroSection/HeroSection';

export const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <HeroSection />
    </div>
  );
};
