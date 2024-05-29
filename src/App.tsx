import { Header } from './components/Header/Header';
import { AsideMenu } from './components/Header/AsideMenu';
import { useContext } from 'react';
import { ThemeContext } from './store/ThemeProvider';
import cn from 'classnames';

export const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={cn({ page: theme })}>
      <Header />
      <AsideMenu />

      <main className={'background'}></main>
      <footer></footer>
    </div>
  );
};
