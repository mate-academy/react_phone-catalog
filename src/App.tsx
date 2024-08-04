import { Outlet } from 'react-router-dom';
import './App.scss';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div className="App">
      <TopBar />
      <div className="App__content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
