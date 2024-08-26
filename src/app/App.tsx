import { Suspense } from 'react';
import { Header } from '../widgets/Header';
import AppRouter from './providers/router/ui/AppRouter';
import { useTheme } from './providers/ThemeProvider';
import classNames from 'classnames';
import cls from './app.module.scss';
import { Footer } from '../widgets/Footer/ui/Footer';
import { Page } from '../shared/ui/Page';

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
