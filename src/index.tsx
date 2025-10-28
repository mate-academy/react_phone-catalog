import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles/normalize.scss';
import './styles/variables.scss';
import './styles/mixins.scss';
import './styles/fonts.scss';
import './styles/global.scss';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import { RootProvider } from './context/RootProvider';
import { BASE_URL } from './utils/variables/base';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter basename={BASE_URL}>
    <ScrollToTop />
    <RootProvider>
      <App />
    </RootProvider>
  </BrowserRouter>,
);
