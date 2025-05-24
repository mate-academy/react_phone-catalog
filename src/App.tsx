import './App.scss';
import { Navbar } from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
export const App = () => (
  <div className="page">
    <Navbar />
    <div>
      <Outlet />
    </div>
    <Footer />
  </div>
);
