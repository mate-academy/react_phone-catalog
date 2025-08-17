import './App.scss';
import { Body } from './layout/Body/Body';
import { Footer } from './layout/Footer/Footer';
import { Header } from './layout/Header/Header';
import { useTheme } from './context/ThemeContext';

export const App = () => {
  const { theme } = useTheme();

  return (
    <div className={`App theme-${theme}`}>
      <h1>Product Catalog</h1>
      <Header />
      <Body />
      <Footer />
    </div>
  );
};
