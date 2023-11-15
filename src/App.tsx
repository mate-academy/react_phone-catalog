import React, { useState, Suspense, useEffect } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import { Outlet as Main } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import * as goodsActions from './store/reducers/goodsSlice';

import { getScreenType } from './helpers/getScreenType';
import { Resolutions } from './types/Resolutions';

import { Header } from './components/Header/Header';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Burger } from './components/Burger/Burger';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { Footer } from './components/Footer/Footer';

import './App.scss';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { goods } = useAppSelector(state => state.goods);
  const [updatedAt, setUpdatedAt] = useState(new Date());

  const [screenType, setScreenType] = useState(getScreenType());
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isSearchOpened, setIsSearchOpened] = useState(false);

  useEffect(() => {
    dispatch(goodsActions.init());
  }, [updatedAt]);

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

        {goods.length ? (
          <Main />
        ) : (
          <ErrorMessage
            rootClassName=""
            reload={() => setUpdatedAt(new Date())}
          />
        )}

        <Footer
          setIsMenuOpened={setIsMenuOpened}
        />
      </div>
    </Suspense>
  );
};
