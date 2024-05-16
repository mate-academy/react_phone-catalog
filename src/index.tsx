import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { ContextProvider } from './context/context';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ContextProvider>
    <Root />,
  </ContextProvider>,
);
