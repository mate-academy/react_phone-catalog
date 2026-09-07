import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { TopBar } from './components/TopBar';

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
