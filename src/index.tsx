import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';

const Root = () => (
  <Router>
    <App />
  </Router>
);

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
