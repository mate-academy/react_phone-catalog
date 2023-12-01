import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Hedaer';
import './App.scss';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => (
  <div className="App">
    <Header />

    <div className="App__main">
      <Outlet />
    </div>

    <Footer />
  </div>
);
