import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './fonts/Mont-Bold.otf';
import './fonts/Mont-Regular.otf';
import './fonts/Mont-SemiBold.otf';
import './index.scss';

import { Root } from './Root';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <Router>
    <Root />
  </Router>,
);
