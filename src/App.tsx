import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './Components/Footer';
import { Header } from './Components/Header';
import './styles/styles.scss';
import { useState } from 'react';

export const App = () => {
  const [isDark, setIsDark] = useState(true);

  const handleThemeClick = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="App" data-theme={isDark ? 'dark' : 'light'}>
      <Header isDark={isDark} onDark={handleThemeClick} />
      <Outlet />
      {<Footer />}
    </div>
  );
};
