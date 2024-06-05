import { Header } from './components/Header/Header';
import { AsideMenu } from './components/AsideMenu';
import { useContext } from 'react';
import { ThemeContext } from './store/ThemeProvider';
import cn from 'classnames';
import { Main } from './components/Main/Main';

export const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={cn({ page: theme })}>
      <Header />
      <AsideMenu />
      <Main />
      <footer></footer>
    </div>
  );
};
