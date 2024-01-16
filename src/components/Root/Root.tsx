/* eslint-disable jsx-a11y/control-has-associated-label */
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';

import './Root.scss';
import { Footer } from '../Footer';

export const Root = () => {
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

      <footer>
        <Footer />
      </footer>
    </div>
  );
};
