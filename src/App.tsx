import './App.scss';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import {
  MenuContextProvider,
} from './components/MenuContextProvider';
import { ScreenSizeProvider } from './components/ScreenSizeProvider';
import { TopBar } from './components/TopBar';
import {
  FavouritesContextProvider,
} from './components/FavouritesContextProvider/FavouritesContextProvider';
import { CartContextProvider } from './components/CartContextProvider';
import { QuerySearchContextProvider } from './components/QuerySearchContext';

export const App = () => {
  const { pathname } = useLocation();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <ScreenSizeProvider>
      <MenuContextProvider>
        <QuerySearchContextProvider>
          <FavouritesContextProvider>
            <CartContextProvider>
              <div className="app">
                <header ref={ref} className="header">
                  <TopBar />
                </header>

                <main className="app__main">
                  <div className="app__content">
                    <Outlet />
                  </div>
                </main>
                <Footer hasScroll={!inView} />
              </div>
            </CartContextProvider>
          </FavouritesContextProvider>
        </QuerySearchContextProvider>
      </MenuContextProvider>
    </ScreenSizeProvider>
  );
};
