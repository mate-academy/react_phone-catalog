import { Outlet } from 'react-router-dom';
import './App.scss';

export const App = () => (
  <main className="main">
    <Outlet />
  </main>
);
