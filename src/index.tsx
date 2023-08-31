import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { Root } from './Root';

ReactDOM.render(
  <Router>
    <Root />
  </Router>,
  document.getElementById('root'),
);
