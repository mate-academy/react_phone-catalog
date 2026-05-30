import { createRoot } from 'react-dom/client';
import { Root } from './components/Root';
import './i18n/i18n';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
