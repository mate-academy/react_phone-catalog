import { Outlet } from 'react-router-dom';
import '../styles/blocks/main.scss';

export const Main = () => {
  return (
    <main className="main">
      <Outlet />
    </main>
  );
};
