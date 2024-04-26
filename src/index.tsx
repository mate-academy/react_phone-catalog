import { createRoot } from 'react-dom/client';
import { Router } from './Router';
import './index.css';

createRoot(document.querySelector('body') as HTMLElement).render(<Router />);
