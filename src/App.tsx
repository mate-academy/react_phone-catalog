import { useEffect } from 'react';
import './App.scss';
import { Navbar } from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import useThemeStore from './stores/useThemeStore'; // Імпорт стору теми
import { Footer } from './components/Footer';

export const App = () => {
  const { currentTheme } = useThemeStore(); // Отримуємо поточну тему

  // Застосування класу теми до body
  useEffect(() => {
    document.body.className = `theme-${currentTheme}`; // Додаємо клас, наприклад, 'theme-light', 'theme-dark'
  }, [currentTheme]);

  return (
    <div data-cy="app" className="app">
      <Navbar />

      <main className="section">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
