import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../src/app/store/store';
import './mainStyles/main.scss';
import { HashRouter } from 'react-router-dom';
import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <HashRouter>
      <Root />
    </HashRouter>
  </Provider>,
);
