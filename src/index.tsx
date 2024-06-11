import * as Toast from '@radix-ui/react-toast';

import { App } from './App';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Toast.Provider>
    <App />
  </Toast.Provider>,
);
