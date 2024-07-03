import './App.scss';
import { Outlet } from 'react-router-dom';

export const App = () => (
  <div className="App">
    <h1 className="visually-hidden">Product Catalog</h1>
    <Outlet />
  </div>
);
