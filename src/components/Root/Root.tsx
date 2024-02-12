/* eslint-disable jsx-a11y/control-has-associated-label */
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';

import { Footer } from '../Footer';
import './Root.scss';

export const Root = () => {
  return (
    <div className="app">
      <header className="app__header header">
        <Navbar />
      </header>

      <main className="main">
        {/* <div> */}
        <Outlet />
        {/* </div> */}
      </main>

      <Footer />
    </div>
  );
};
