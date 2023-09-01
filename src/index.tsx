import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { Root } from './Root';
import { SavedItemsProvoder } from './store/SavedProductsContext';

ReactDOM.render(
  <SavedItemsProvoder>
    <HashRouter>
      <Root />
    </HashRouter>
  </SavedItemsProvoder>,
  document.getElementById('root'),
);
