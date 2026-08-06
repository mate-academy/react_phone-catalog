import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export const App = () => (
  <div className="App">
    <h1>Product Catalog</h1>
    <div className="app-container">
      <header>
        <Navbar />
      </header>
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  </div>
);
