import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { Home } from './pages/Home';
import { Phones } from './pages/Phones';
import { Tablets } from './pages/Tablets';
import { Accessories } from './pages/Accessories';
import { NotFound } from './pages/NotFound';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />

        <Route path="phones">
          <Route index element={<Phones />} />
          <Route path=":slug" element={<Phones />} />
        </Route>

        <Route path="tablets">
          <Route index element={<Tablets />} />
          <Route path=":slug" element={<Tablets />} />
        </Route>

        <Route path="accessories">
          <Route index element={<Accessories />} />
          <Route path=":slug" element={<Accessories />} />
        </Route>

        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);
