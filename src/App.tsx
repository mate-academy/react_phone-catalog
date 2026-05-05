import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { ProductCarts } from './components/ProductCart/ProductCarts';
import { Outlet } from 'react-router-dom';
import { BannerSlider } from './components/BannerSlider';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>
      <Header />
      <BannerSlider />
      <ProductCarts
        id={'id'}
        title={'title'}
        price={0}
        screen={'screen'}
        capacity={'capacity'}
        ram={'ram'}
      />
      <Footer />
    </div>
  );
};
