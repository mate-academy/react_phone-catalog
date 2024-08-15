import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Footer } from './components/Footer';

import './App.scss';

import { MainHeader } from './components/MainHeader';
import { PageLayout } from './layouts/PageLayout';

export const App = () => {
  return (
    <div className="App">
      <MainHeader />

      <PageLayout>
        <Outlet />
      </PageLayout>

      <ToastContainer />
      <Footer />
    </div>
  );
};
