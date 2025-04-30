import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/shared/components/Header/Header';
import { Footer } from './modules/shared/components/Footer/Footer';
import { useContext } from 'react';
import { ProductsContext } from './modules/shared/_store/ProductsProvider';
import { Container } from './modules/shared/components/Container';

export const App = () => {
  const { error } = useContext(ProductsContext);

  return (
    <div className="app">
      <Header />
      {!!error && <p>{error}</p>}
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};
