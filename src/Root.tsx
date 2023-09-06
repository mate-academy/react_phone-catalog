import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/HomePage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);
