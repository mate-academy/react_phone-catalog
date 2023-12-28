import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const App = () => (
  <div className="App">
    <Header />

    <div className="App__main">
      <Outlet />
    </div>

    <Footer />
  </div>
);
