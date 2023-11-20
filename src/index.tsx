import ReactDom from 'react-dom';

import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Root = () => (
  <Router>
    <App />
  </Router>
);

ReactDom.render(<Root />, document.getElementById('root'));
