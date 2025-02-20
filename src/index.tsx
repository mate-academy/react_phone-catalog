import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import './styles/main.scss';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
