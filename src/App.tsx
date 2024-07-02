import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useThemeContext } from './context/ThemeContext';

export const App = () => {
  const { theme } = useThemeContext();
  return (
    <div className={`App ${theme}`}>
      <Header />

      <main className="container">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
