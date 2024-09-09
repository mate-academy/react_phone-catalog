import { Suspense } from 'react';
import classNames from 'classnames';
import AppRouter from './providers/router/ui/AppRouter';
import { Header } from '../widgets/Header';
import { useTheme } from './providers/ThemeProvider';
import { Footer } from '../widgets/Footer/ui/Footer';
import cls from './app.module.scss';
import { Page } from '../widgets/Page';

function App() {
  const { theme } = useTheme();

  return (
    <div className={classNames(cls.app, theme)} id="top">
      <Suspense fallback="">
        <Header />
        <Page>
          <AppRouter />
        </Page>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
