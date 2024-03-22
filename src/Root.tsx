import {
  Routes,
  Route,
  Navigate,
  HashRouter as Router,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { Sidebar } from './modules/shared/Sidebar';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="menu" element={<Sidebar />} />
      </Route>
    </Routes>
  </Router>
);
