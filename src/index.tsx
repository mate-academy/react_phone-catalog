import { createRoot } from 'react-dom/client';
import './index.scss';
import { Router } from './Router';

createRoot(document.getElementById('root') as HTMLElement).render(<Router />);
