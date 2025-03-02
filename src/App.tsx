import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
