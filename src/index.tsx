import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { MyProvider } from './Contexts.tsx/ProductContexts';

createRoot(document.getElementById('root') as HTMLElement).render(
  <MyProvider>
    <Root />
  </MyProvider>,
);
