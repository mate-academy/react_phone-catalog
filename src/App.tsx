import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { useTheme } from './store/ThemeContext';

export const App = () => {
  const { theme, isThemeLoaded } = useTheme();

  if (!isThemeLoaded) {
    return null;
  }

  return (
    <div className={`App ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
