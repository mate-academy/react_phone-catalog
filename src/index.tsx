import './styles/base.css';

import * as Toast from '@radix-ui/react-toast';

import Root from './routes/Root';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Toast.Provider>
    <Root />
  </Toast.Provider>,
);
