import { Outlet } from 'react-router-dom';
import './App.scss';
import './Icon.scss';
import Footer from './components/Footer/Footer';
import { Header } from './components/Header';

export const App = () => (
  <div className="App">
    <Header />
    <div className="wrapper">
      <Outlet />
    </div>
    <Footer />
  </div>
);
