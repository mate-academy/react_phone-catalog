import { FC, useContext, useEffect } from 'react';
import useReactFontLoader from 'react-font-loader';
import './styles/normalize.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { ThemeContext } from './contexts/ThemeContext';
import { Footer } from './components/Footer';
import { Styles } from './types/Styles';

const styles: Styles = require('./App.module.scss');

const {
  App: app,
  App__Header: header,
  App__Footer: footer,
} = styles;

export const App: FC = () => {
  const { isThemeDark, theme } = useContext(ThemeContext);

  useReactFontLoader({
    // eslint-disable-next-line max-len
    url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap',
  });

  useEffect(() => {
    if (isThemeDark) {
      document.documentElement.classList.add('page--dark');
    } else {
      document.documentElement.classList.remove('page--dark');
    }
  }, [theme]);

  return (
    <div className={app}>
      <Header className={header} />

      <Outlet />

      <Footer className={footer} />
    </div>
  );
};
