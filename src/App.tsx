import React, { memo, useContext } from 'react';
import './styles/index.scss';
import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import BreadCrumbs from './components/UI/BreadCrumbs';
import { ErrorContext } from './store/contexts/ErrorContext';

export const App: React.FC = memo(() => {
  const { error } = useContext(ErrorContext);

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
