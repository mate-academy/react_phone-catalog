import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';

const Root = () => (
  <Router basename="/react_phone-catalog">
    <App />
  </Router>
);

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
