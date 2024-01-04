import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

import './App.scss';

export const App = () => (
  <div className="App">
    <Header />

    <div className="App__main">
      <Outlet />
    </div>

    <Footer />
  </div>
);
