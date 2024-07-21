import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navigation } from './components/navigation/navigation';
import { Footer } from './components/footer/footer';

export const App = () => (
  <div className="App">
    <header className="header">
      <Navigation />
    </header>
    <Outlet />
    <Footer />
  </div>
);
