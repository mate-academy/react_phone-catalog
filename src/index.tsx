import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';
import { ContextProvider } from './components/context';

ReactDOM.render(
  <ContextProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </ContextProvider>,
  document.getElementById('root'),
);
