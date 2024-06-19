import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Footer } from './components/Footer';
import { Header } from './components/Header';

import './App.scss';
import { PageLayout } from './layouts/PageLayout';
import { AccessoriesProvider } from './store/AccessoriesProvider';
import { PhonesProvider } from './store/PhonesProvider';
import { TabletsProvider } from './store/TabletsProvider';

export const App = () => (
  <div className="App">
    <PhonesProvider>
      <TabletsProvider>
        <AccessoriesProvider>
          <Header />

          <PageLayout>
            <Outlet />
          </PageLayout>

          <ToastContainer />
          <Footer />
        </AccessoriesProvider>
      </TabletsProvider>
    </PhonesProvider>
  </div>
);
