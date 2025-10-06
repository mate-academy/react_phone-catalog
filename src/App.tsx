import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './shared/components/Header';
import { Footer } from './shared/components/Footer/Footer';
import { Menu } from './Pages/HomePage/components/Menu';

export const App = () => (
  <div className="App">
    <Header />
    <Menu />

    <div className="container">
      <Outlet />
    </div>
    <Footer />
  </div>
);
