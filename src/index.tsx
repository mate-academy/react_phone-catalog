import ReactDOM from 'react-dom';

import { Root } from './Root';
import { CatalogProvider } from './helpers/CatalogContext/CatalogContext';

ReactDOM.render(
  <CatalogProvider>
    <Root />
  </CatalogProvider>,
  document.getElementById('root'),
);
