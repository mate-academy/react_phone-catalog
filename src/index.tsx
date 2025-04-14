import { createRoot } from 'react-dom/client';
import './assets/styles/main.scss';
import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
