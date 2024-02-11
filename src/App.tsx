import './App.scss';
import { Outlet } from 'react-router-dom';
import { NavBar } from './component/NavBar';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <Outlet />
      </main>
    </div>
  );
};
