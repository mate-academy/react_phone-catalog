import { createRoot } from 'react-dom/client';
import { AppProvider } from './AppContext';
import { HashRouter as Router } from 'react-router-dom';
import './App.scss';
import './utils/resetting.css';
import { Main } from './Main';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <AppProvider>
      <Main />
    </AppProvider>
  </Router>,
);
