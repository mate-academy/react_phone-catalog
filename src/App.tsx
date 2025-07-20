import { type FC, useEffect } from 'react';

import { useThemeStore } from './store/themeStore';

import { Footer } from './components/LayoutParts/Footer';
import { Header } from './components/LayoutParts/Header';
import { Main } from './components/Main';

import { HelloModalBlock } from './components/HelloModalBlock';
import './styles/global.scss';
import { ScrollToTop } from './utils/scrollToTop';

export const App: FC = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-wrapper">
      <ScrollToTop />
      <HelloModalBlock />
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
