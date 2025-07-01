import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="App">
      <h1 hidden>Product Catalog</h1>
      <Header />

      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
