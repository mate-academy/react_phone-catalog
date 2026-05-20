import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

import styles from './MainLayout.module.scss';
import { Footer } from './Footer';
import { HTMLDataAttr } from '../../../../enums/htmlDataAttribs';
import { setElementDataAttr } from '../../../../helpers/setHtmlDataAttr';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { init as initProducts } from '../../../../features/productsSlice';
import { init as initFavourites } from '../../../../features/favouritesSlice';
import { init as initCart } from '../../../../features/cartSlice';
import { init as initPhones } from '../../../../features/phonesSlice';
import { init as initTablets } from '../../../../features/tabletsSlice';
import { init as initAccessories } from '../../../../features/accessoriesSlice';
import { PageStateWrapper } from '../../organisms/PageStateWrapper';
import { RetryErrorMessage } from '../../organisms/RetryErrorMessage';
import { Toaster } from 'sonner';

export const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(state => state.theme);
  const { loading, error } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(initProducts());
    dispatch(initFavourites());
    dispatch(initCart());
    dispatch(initPhones());
    dispatch(initTablets());
    dispatch(initAccessories());
  }, [dispatch]);

  useEffect(() => {
    setElementDataAttr('html', HTMLDataAttr.Theme, theme);
  }, [theme]);

  return (
    <PageStateWrapper asyncStates={[{ loading }]}>
      <div className={styles.container}>
        <Header />
        {error ? (
          <RetryErrorMessage />
        ) : (
          <main className={styles.main}>
            <section className={styles.main__content}>
              <Outlet />
            </section>
          </main>
        )}
        <Footer />
      </div>
      <Toaster position="bottom-right" expand duration={3000} />
    </PageStateWrapper>
  );
};
