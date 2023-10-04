import './App.scss';
import { Outlet } from 'react-router-dom';
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
