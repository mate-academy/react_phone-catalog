import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './shared/components/Header';

export const App = () => (
  <div className="page__app">
    <Header />
    <Outlet />
  </div>
);
