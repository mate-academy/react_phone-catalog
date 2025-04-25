import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './modules/Header';
import Footer from './modules/Footer';

export const App = () => (
  <div className="App">
    <Header />
    <main className="main">
      <Outlet />
      <Footer />
    </main>
  </div>
);
