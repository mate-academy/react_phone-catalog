import App from './App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router basename="/react_phone-catalog/">
    <App />
  </Router>,
);
