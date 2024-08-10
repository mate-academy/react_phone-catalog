import { createRoot } from 'react-dom/client';
import './index.css';
import { Router } from './Router';

createRoot(document.querySelector('body') as HTMLElement).render(<Router />);
