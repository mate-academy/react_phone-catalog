import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { Root } from './Root';
import { SavedItemsProvoder } from './store/SavedProductsContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <SavedItemsProvoder>
    <HashRouter>
      <Root />
    </HashRouter>
  </SavedItemsProvoder>,
);
