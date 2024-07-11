import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './Components/Footer';
import { Header } from './Components/Header';
import './styles/styles.scss';
import { useLocalStorage } from './hooks/useLocalStorage';

export const App = () => {
  const preference = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [isDark, setIsDark] = useLocalStorage('isDark', preference);

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
