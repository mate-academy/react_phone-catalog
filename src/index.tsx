import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import { ProductProvider } from './context';
import './styles/index.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <ProductProvider>
      <App />
    </ProductProvider>
  </HashRouter>,
);
