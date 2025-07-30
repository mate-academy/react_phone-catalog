import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export const App = () => (
  <div className="App">
    <h1 className='requiredTitle'>Product Catalog</h1>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);
