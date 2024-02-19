import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import { setupStore } from './store/store';

const store = setupStore();

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
