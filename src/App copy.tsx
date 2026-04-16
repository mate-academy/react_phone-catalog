import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { ProductCarts } from './components/ProductCart/ProductCarts';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <Header />
      <ProductCarts
        id={'id'}
        title={'title'}
        price={0}
        screen={'screen'}
        capacity={'capacity'}
        ram={'ram'}
      />
      <Footer />

      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
