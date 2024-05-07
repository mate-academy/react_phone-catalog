import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { GlobalProvider } from './components/Context/Context';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalProvider>
    <Root />
  </GlobalProvider>,
);
