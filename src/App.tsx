import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export const App = () => (
  <div>
    <Navbar />

    <main className="section">
      <Outlet />
    </main>

    <Footer />
  </div>
);
