import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import App from '../App';
import { NotFoundPage } from '../pages/NotFoundPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<div>Home</div>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
