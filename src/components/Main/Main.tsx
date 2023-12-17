import { Outlet } from 'react-router-dom';

export const Main = () => {
  return (
    <div className="h1">
      all in main
      <Outlet />
    </div>
  );
};
