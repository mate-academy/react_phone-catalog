import { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Loader } from './components/Loader/Loader';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { HomePage } from './modules/HomePage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { NotFoundPage } from './modules/NotFoundPage';
import styles from './App.module.scss';
import { MobileMenu } from './components/MobileMenu';
import { useAppContext } from './context/AppContext';

export const Root = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isMobMenuOpen } = useAppContext();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <Router>
      <div className={styles.app}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Header />
            <div
              className={`${isMobMenuOpen ? styles.menuVisible : styles.menuHidden}`}
            >
              <MobileMenu />
            </div>
            <div className={styles.menuPaddingCorrection} />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/phones" component={PhonesPage} />
              <Route path="/tablets" component={TabletsPage} />
              <Route path="/accessories" component={AccessoriesPage} />
              <Route path="/cart" component={CartPage} />
              <Route path="/favorites" component={FavoritesPage} />
              <Route path="/product" component={ProductDetailsPage} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
};
