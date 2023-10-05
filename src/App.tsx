import React, { useState, Suspense, useEffect } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import { Outlet as Main } from 'react-router-dom';

import { getScreenType } from './helpers/getScreenType';
import { getData } from './helpers/httpClient';

import { Resolutions } from './types/Resolutions';
import { Good } from './types/Good';

import { Header } from './components/Header/Header';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Burger } from './components/Burger/Burger';
import { Footer } from './components/Footer/Footer';

import './App.scss';

export const App: React.FC = () => {
  const [screenType, setScreenType] = useState(getScreenType());
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isSearchOpened, setIsSearchOpened] = useState(false);
  const [goods, setGoods] = useState<Good[]>([]);

  useEffect(() => {
    getData<Good[]>('goods')
      .then(setGoods);
  }, []);

  return (
    <Suspense fallback="...loading">
      <div className="app">
        <Header
          isMenuOpened={isMenuOpened}
          setIsMenuOpened={setIsMenuOpened}
          screenType={screenType}
          setScreenType={setScreenType}
          setIsSearchOpened={setIsSearchOpened}
        />

        <Transition
          in={isSearchOpened}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          {(state: TransitionStatus) => (
            <SearchBar
              className={`searchBar--${state}`}
              goods={goods}
              setIsSearchOpened={setIsSearchOpened}
            />
          )}
        </Transition>

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
              setIsSearchOpened={setIsSearchOpened}
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
