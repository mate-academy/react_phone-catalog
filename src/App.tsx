import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { ProductProvider } from './store/ProductContext';

export const App = () => (
  <ProductProvider>
    <Header />
    <div className="body">
      <Outlet />
    </div>
  </ProductProvider>
);
