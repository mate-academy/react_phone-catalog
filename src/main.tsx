import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Root } from './Root';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
