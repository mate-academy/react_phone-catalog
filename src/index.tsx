import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import './component/style/index.scss';
import { App } from './App';
import { StateProvider } from './hooks/SelectionState';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <StateProvider>
      <App />
    </StateProvider>
  </Router>,
);
