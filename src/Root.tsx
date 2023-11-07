import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import App from './App';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </Router>
);
