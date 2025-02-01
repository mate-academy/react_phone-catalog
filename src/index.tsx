import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import './utils/i18n/index';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
