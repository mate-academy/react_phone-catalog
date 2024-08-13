import { Outlet } from 'react-router-dom';
import './App.scss';
import './styles/main.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SideMenu } from './components/SideMenu';

export const App = () => {
  return (
    <div className="App">
      <h1 className="visually-hidden" id="home">
        Product Catalog
      </h1>
      <Header />

      <SideMenu />

      <div className="container">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
