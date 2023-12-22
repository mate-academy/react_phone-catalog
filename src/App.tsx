// import './App.scss';
import { Outlet } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
