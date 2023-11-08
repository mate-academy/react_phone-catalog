import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="phones" element={<PhonesPage />} />
      </Route>

      <Route path="notfound" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="notfound" replace />} />
    </Routes>
  </Router>,
  document.getElementById('root'),
);
