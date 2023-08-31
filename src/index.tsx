import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

import App from './App';
import { StoragesProvider } from './Context/StoragesContext';

ReactDOM.render(
  <StoragesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoragesProvider>,
  document.getElementById('root'),
);
