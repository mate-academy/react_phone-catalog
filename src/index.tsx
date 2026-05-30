import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import './styles/normalize.scss';
import './styles/variables.scss';
import './styles/mixins.scss';
import './styles/fonts.scss';
import './styles/global.scss';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import { RootProvider } from './context/RootProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <ScrollToTop />
    <RootProvider>
      <App />
    </RootProvider>
  </HashRouter>,
);
