import React, { useState, Suspense } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
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
    <Suspense fallback="...loading">
      <div className="app">
        <Header
          isMenuOpened={isMenuOpened}
          setIsMenuOpened={setIsMenuOpened}
          screenType={screenType}
          setScreenType={setScreenType}
        />

        <Transition
          in={isMenuOpened && screenType !== Resolutions.Desktop}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          {(state: TransitionStatus) => (
            <Burger
              classNames={`burger burger--${state}`}
              isMenuOpened={isMenuOpened}
              setIsMenuOpened={setIsMenuOpened}
              screenType={screenType}
              setScreenType={setScreenType}
            />
          )}
        </Transition>
        <Main />
        <Footer
          setIsMenuOpened={setIsMenuOpened}
        />
      </div>
    </Suspense>
  );
};
