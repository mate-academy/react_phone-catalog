import { createRoot } from 'react-dom/client';
import './i18n';
import './styles/index.scss';
import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
