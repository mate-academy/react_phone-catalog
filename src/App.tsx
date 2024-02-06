import React, { memo, useContext, useEffect } from 'react';
import './styles/index.scss';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import BreadCrumbs from './components/UI/BreadCrumbs';
import { ErrorContext } from './store/contexts/ErrorContext';

export const App: React.FC = memo(() => {
  const location = useLocation();
  const { error } = useContext(ErrorContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  return (
    <div className="App">
      <Header />

      <main className="main">
        {!error && <BreadCrumbs className='main__bread-crumbs' />}

        <Outlet />
      </main>

    </div>
  )
});
