import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export const App = () => (
  <>
    <Header />
    <div className="App">
      <Outlet />
      <Footer />
    </div>
  </>
);
