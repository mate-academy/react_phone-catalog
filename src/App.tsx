import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { useThemeState } from './stateManagers/themeState';

import { Aside } from './Components/Aside';
import { useAsideState } from './stateManagers/asideState';

export const App = () => {
  const { theme } = useThemeState();
  const { isAsideOpen } = useAsideState();

  return (
    <div className={`App App--${theme}`}>
      <Header />

      {isAsideOpen && <Aside />}

      <main className="section">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
