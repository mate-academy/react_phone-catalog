import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

const Root = () => (
  <Router>
    <App />
  </Router>
);

root.render(<Root />);
