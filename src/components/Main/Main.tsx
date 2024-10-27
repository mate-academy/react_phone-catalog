import './Main.scss';
import { Outlet } from 'react-router-dom';

export const Main: React.FC = () => {
  return (
    <main className="main">
      <Outlet />
    </main>
  );
};
