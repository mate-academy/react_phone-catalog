import React from 'react';
import { Outlet } from 'react-router-dom';

import './Main.scss';

export const Main: React.FC = () => {
  return (
    <div className="main">
      <div className="container main__container">
        <Outlet />
      </div>
    </div>
  );
};
