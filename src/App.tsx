import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header/Header';
import { Outlet } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
