// import ReactDOM from 'react-dom';

// import {App} from './App';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root'),
// );

import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { App } from './App';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root'),
);
