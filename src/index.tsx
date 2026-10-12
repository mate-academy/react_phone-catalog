import { createRoot } from 'react-dom/client';

import { App } from './app/App';
import './styles/index.scss';
import './service/i18n/i18n';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
