import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navigation } from './components/navigation/navigation';
import { Footer } from './components/footer/footer';

export const App = () => (
  <div className="App">
    <Navigation />

    <div className="content">
      <Outlet />
    </div>
    <Footer />
  </div>
);
