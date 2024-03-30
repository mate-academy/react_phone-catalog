import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import './App.scss';

export const App = () => (
  <div className="App" id="App">
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);
