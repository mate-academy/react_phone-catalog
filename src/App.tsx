import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/header/Header';

export const App = () => (
  <div className="page">
    <Header />
    <main className="page__container">
      <Outlet />
    </main>
  </div>
);
