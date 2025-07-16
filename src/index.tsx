import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
// import 'bulma/css/bulma.css';
// import '@fortawesome/fontawesome-free/css/all.css';
import { Root } from './Root';
import { MenuProvider } from './context/MenuContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <MenuProvider>
    <Router>
      <Root />
    </Router>
  </MenuProvider>,
);
