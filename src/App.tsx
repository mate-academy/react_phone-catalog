import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App = () => (
  <div className="App">
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);
