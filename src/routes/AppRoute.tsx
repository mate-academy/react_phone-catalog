import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import App from '../App';
import { HomePage } from '../pages/HomePage/HomePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route
          path="home"
          element={<Navigate to="/" replace />}
        />
      </Route>
    </Routes>
  </Router>
);
