import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import App from './App';
import '@fortawesome/fontawesome-free/css/all.css';
import { WidthContextProvider } from './components/context/WidthContext';
import { SaveProductsContext } from './components/context/SavedProductsContext';

ReactDOM.render(
  <Router>
    <WidthContextProvider>
      <SaveProductsContext>
        <App />
      </SaveProductsContext>
    </WidthContextProvider>
  </Router>,
  document.getElementById('root'),
);
