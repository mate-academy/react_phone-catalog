import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import './i18n';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
