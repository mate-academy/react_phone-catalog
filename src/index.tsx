import { createRoot } from 'react-dom/client';
import { Root } from './Mixins/Root';
import { MyProvider } from './Context/ProductContexts';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <MyProvider>
    <Root />
  </MyProvider>,
);
