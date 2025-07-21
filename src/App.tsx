import React from 'react';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="flex flex-col min-w-[320px] min-h-[100dvh]">
      <Header />
      <Menu />
      <Main />
      <Footer />
    </div>
  );
};
