import React from 'react';
import { Hero } from '../../components/Hero';
import { NewModels } from '../../components/NewModels';

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <NewModels />
    </main>
  );
};

export default HomePage;
