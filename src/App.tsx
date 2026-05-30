import { Outlet } from 'react-router-dom';
import './App.scss';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div className="app">
      <TopBar />

      <main className="app__main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
