import './App.scss';
import { Outlet } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import './styles/reset.scss';
import './styles/common.scss';

export const App = () => (
  <div className="App">
    <Header />
    <main className="main">
      <Outlet />
    </main>
    <Footer />
  </div>
);
