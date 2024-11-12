import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@shared/contexts/theme/Theme.context';

import { router } from './router';

import './App.scss';

export const App = () => (
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
