import { Outlet } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import './App.scss';

export const App = () => (
  <div className="App page__body">
    <Header />

    <Outlet />

    <Footer />
  </div>
);
