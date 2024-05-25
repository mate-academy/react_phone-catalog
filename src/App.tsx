import { useContext } from 'react';
import { ThemeContext } from './store/ThemeProvider';
import { Header } from './components/Header/Header/Header';

export const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme}>
      <Header />

      <main className={'background'}></main>
      <footer></footer>
    </div>
  );
};
