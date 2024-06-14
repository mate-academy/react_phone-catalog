import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import { Header } from './components/Header';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { Footer } from './components/Footer';
import { BurgerMenu } from './components/BurgerMenu';
import { ItemsProvider } from './ItemsContext';
import { useLocalStorage } from './hooks/useLocalStorage';

export const App: React.FC = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useLocalStorage('darkTheme', false);

  const { currentId } = useParams();

  if (currentId === 'home') {
    return <Navigate to=".." />;
  }

  return (
    <ItemsProvider>
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
          <main>
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
