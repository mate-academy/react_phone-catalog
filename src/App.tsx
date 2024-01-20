import './App.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export const App = () => (
  <div className="App">
    <Header />
    <div className="container">
      <Outlet />
    </div>
    <Footer />
  </div>
);
