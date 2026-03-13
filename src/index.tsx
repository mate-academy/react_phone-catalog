import '@/i18n/i18n';
import '@/styles/global.scss';
import { createRoot } from 'react-dom/client';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
