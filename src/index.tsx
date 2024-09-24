import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import './utils/language';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
