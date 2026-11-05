import { RouterProvider } from 'react-router-dom';

import { AppProviders } from './providers';
import { router } from './router';

export const App = () => {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
};
