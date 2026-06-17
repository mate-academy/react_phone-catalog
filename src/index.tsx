import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import './styles/fonts.scss';
import './styles/global.scss';
import 'swiper/css';
import 'swiper/css/navigation';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
