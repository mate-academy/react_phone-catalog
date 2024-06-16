import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import { Header } from './components/Header';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { Footer } from './components/Footer';
import { BurgerMenu } from './components/BurgerMenu';
import { ItemsProvider } from './ItemsContext';
import { useLocalStorage } from './hooks/useLocalStorage';

export const App: React.FC = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useLocalStorage('darkTheme', false);

  const { currentId } = useParams();

  const { pathname } = useLocation();

  if (currentId === 'home') {
    return <Navigate to=".." />;
  }

  return (
    <ItemsProvider>
      <h1 className="main-title">Product Catalog</h1>
      <div
        className={cn('app', {
          'app--dark-theme': darkTheme,
        })}
      >
        {isBurgerMenuOpen ? (
          <BurgerMenu
            setIsBurgerMenuOpen={setIsBurgerMenuOpen}
            isBurgerMenuOpen={isBurgerMenuOpen}
            darkTheme={darkTheme}
            setDarkTheme={setDarkTheme}
          />
        ) : (
          <main
            className={cn({
              main: pathname === '/cart' || pathname === '/favorites',
            })}
          >
            <Header
              setIsBurgerMenuOpen={setIsBurgerMenuOpen}
              isBurgerMenuOpen={isBurgerMenuOpen}
              darkTheme={darkTheme}
              setDarkTheme={setDarkTheme}
            />
            <Outlet context={darkTheme} />

            <Footer darkTheme={darkTheme} />
          </main>
        )}
      </div>
    </ItemsProvider>
  );
};
