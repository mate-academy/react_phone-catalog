/* eslint-disable jsx-a11y/control-has-associated-label */
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';

import './style.scss';

export const Header = () => {
  return (
    <div className="App">
      <header className="header">
        <Navbar />
      </header>

      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
