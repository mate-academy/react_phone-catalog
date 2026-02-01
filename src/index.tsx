import App from './App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
const basename =
  process.env.NODE_ENV === 'production' ? '/react_phone-catalog' : undefined;

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router basename={basename}>
    <App />
  </Router>,
);
