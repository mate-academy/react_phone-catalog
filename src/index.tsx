import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import './fonts/Mont-Bold.otf';
import './fonts/Mont-Regular.otf';
import './fonts/Mont-SemiBold.otf';
import './index.scss';

import { Root } from './Root';
import { StorProvider } from './context/StorProvider';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <StorProvider>
    <Router>
      <Root />
    </Router>
  </StorProvider>,
);
