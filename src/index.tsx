import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import './component/style/index.scss';
import { StateProvider } from './hooks/SelectionState';
import { Root } from './root';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <StateProvider>
      <Root />
    </StateProvider>
  </Router>,
);
