import { RouterProvider } from 'react-router-dom';

import './App.scss';
import { AppProviders } from '@/app/AppProviders';

import { router } from './router';

export const App = () => {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
};
