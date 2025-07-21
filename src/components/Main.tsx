import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const Main: FC = () => {
  return (
    <main className="grow shrink pt-12 lg:pt-16">
      <div className="container">
        <Outlet />
      </div>
    </main>
  );
};
