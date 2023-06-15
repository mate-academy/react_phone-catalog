import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { App } from './App';
import { store } from './app/store';

const Root = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
