import { Outlet } from 'react-router-dom';

import { Footer } from '@layouts/Footer';

import { Toastr } from '@shared/components/Toastr';

import { Header } from '../Header';

export const MainLayout = () => (
  <>
    <Header />

    <Outlet />

    <Footer />

    <Toastr />
  </>
);
