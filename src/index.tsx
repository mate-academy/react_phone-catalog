import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { ContextProvider } from './components/context/context';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ContextProvider>
    <Root />,
  </ContextProvider>,
);
