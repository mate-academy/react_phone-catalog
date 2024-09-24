import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './components/Header/Header';

import './App.scss';
import { Footer } from './components/Footer/Footer';
import classNames from 'classnames';

export const App = () => {
  // eslint-disable-next-line
  const slug = 
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLocation().pathname.slice(1) ? useLocation().pathname.slice(1) : 'home';

  return (
    <div className="App">
      <Header />
      <main className={classNames(`page__main ${slug}`)}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
