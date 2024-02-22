import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import './fonts/Mont-Bold.otf';
import './fonts/Mont-Regular.otf';
import './fonts/Mont-SemiBold.otf';
import './styles/index.scss';

import { Root } from './Root';
import { StorProvider } from './context/StorProvider';
import ScrollToTop from './helpers/scrool';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <StorProvider>
    <Router>
      <ScrollToTop />
      <Root />
    </Router>
  </StorProvider>,
);
