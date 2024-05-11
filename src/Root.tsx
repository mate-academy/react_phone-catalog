import {
  // HashRouter as Router,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);
