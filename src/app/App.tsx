import { Suspense, useEffect } from 'react';
import { Header } from '../widgets/Header';
import AppRouter from './providers/router/ui/AppRouter';
import { useTheme } from './providers/ThemeProvider';
import classNames from 'classnames';
import cls from './app.module.scss';
import { Footer } from '../widgets/Footer/ui/Footer';
import { Page } from '../shared/ui/Page';
import { useAppDispatch, useAppSelector } from '../shared/lib/hooks/reduxHooks';
import { ProductSliceActions } from '../entities/Product/model/slice/productsSlice';
import { getProductsInit } from '../entities/Product/model/selectors/getProductsInit';

function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const init = useAppSelector(getProductsInit);

  useEffect(() => {
    dispatch(ProductSliceActions.initProductsInfo());
  }, [dispatch]);

  return (
    <div className={classNames(cls.app, theme)} id="top">
      <Suspense fallback="">
        <Header />
        <Page>{init && <AppRouter />}</Page>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
