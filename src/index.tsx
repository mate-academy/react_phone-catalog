import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import StateProvider from './reducer';

import App from './App';

ReactDOM.render(
  <StateProvider>
    <Router>
      <App />
    </Router>
  </StateProvider>,
  document.getElementById('root'),
);
