import ReactDOM from 'react-dom';

import { HashRouter as Router } from 'react-router-dom';
import App from './App';

// import 'bulma/css/bulma.css';
// import '@fortawesome/fontawesome-free/css/all.css';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);
