import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';

export const App: React.FC = () => {
  return (
    <div className="App">
      <h1 hidden>Product Catalog</h1>
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
