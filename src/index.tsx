import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routing/router';

createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);
