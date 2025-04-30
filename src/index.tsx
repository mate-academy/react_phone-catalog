import { createRoot } from 'react-dom/client';
import { App } from './App';
import './globalStyles/index.scss';
import { HashRouter as Router } from 'react-router-dom';

const Root = () => (
  <Router>
    <App />
  </Router>
);

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
