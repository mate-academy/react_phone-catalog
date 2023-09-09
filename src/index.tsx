import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="phones" element={<App />}>
        <Route path="motorola-xoom-with-wi-fi" element={<App />} />
      </Route>
    </Routes>
  </HashRouter>,
  document.getElementById('root'),
);
