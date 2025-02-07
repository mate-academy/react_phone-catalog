import { createRoot } from 'react-dom/client';
import { App } from './components/App/App';
import './components/App/App.scss';

// import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { HashRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <App />
  </Router>,
);
