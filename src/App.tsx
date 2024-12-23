import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';

export const App = () => (
  <div className="App">
    <h1 className="App__title">Product Catalog</h1>
    <Header />
    <Outlet />
  </div>
);
