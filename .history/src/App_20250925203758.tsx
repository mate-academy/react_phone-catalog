import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Foote';

export const App = () => (
  <div className="AppWrapper">
    <Header />
    <div className="App">
      <Outlet />
    </div>
    <Footer />
  </div>
);
