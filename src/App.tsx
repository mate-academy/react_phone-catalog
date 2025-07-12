import './styles/main.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export const App = () => (
  <div className="App">
    <h1 hidden>Product Catalog</h1>
    <Navbar />

    <main className="section">
      <Outlet />
    </main>

    <Footer />
  </div>
);
