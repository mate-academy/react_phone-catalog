import { Outlet } from 'react-router-dom';

import { Footer } from '@layouts/Footer';

import { Box } from '@shared/base/Box';
import { Toastr } from '@shared/components/Toastr';

import styles from './MainLayout.module.scss';
import { Header } from '../Header';

export const MainLayout = () => (
  <Box className={styles.container}>
    <Header />

    <Outlet />

    <Footer />

    <Toastr />
  </Box>
);
