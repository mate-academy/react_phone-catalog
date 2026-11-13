import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { App } from './App';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <ShopProvider>
      <App />
    </ShopProvider>
  </BrowserRouter>,
);
