import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Root } from './routes/Root';

const App = () => (
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>
);

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
