import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import './styles/index.scss';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
