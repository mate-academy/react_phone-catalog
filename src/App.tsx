import './App.scss';
import { HashRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes/Routes';

export const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);
