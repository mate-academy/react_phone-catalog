import React, { useState } from 'react';
import { Outlet as Main } from 'react-router-dom';

import { getScreenType } from './helpers/getScreenType';
import { Resolutions } from './types/Resolutions';

import { Header } from './components/Header/Header';
import { Burger } from './components/Burger/Burger';
import { Footer } from './components/Footer/Footer';

import './App.scss';

export const App: React.FC = () => {
  const [screenType, setScreenType] = useState(getScreenType());
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <div className="app">
      <Header
        isMenuOpened={isMenuOpened}
        setIsMenuOpened={setIsMenuOpened}
        screenType={screenType}
        setScreenType={setScreenType}
      />
      {isMenuOpened && screenType !== Resolutions.Desktop && (
        <Burger
          isMenuOpened={isMenuOpened}
          setIsMenuOpened={setIsMenuOpened}
          screenType={screenType}
          setScreenType={setScreenType}
        />
      )}
      <Main />
      <Footer
        setIsMenuOpened={setIsMenuOpened}
      />
    </div>
  );
};
