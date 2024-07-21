import App from './app/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <App />
  </Router>,
);
