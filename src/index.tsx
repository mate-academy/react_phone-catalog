import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';
import { StateProvider } from './StateProvider';

ReactDOM.render(
  <StateProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </StateProvider>,

  document.getElementById('root'),
);
