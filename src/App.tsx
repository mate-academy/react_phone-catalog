import React from 'react';
import { Header } from './modules/Header/Components/Header/Header';
// eslint-disable-next-line max-len
import { AnimatedBody } from './modules/shared/Shared_Components/AnimatedComponents/AnimatedBody';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <AnimatedBody />
    </div>
  );
};
