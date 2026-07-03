import { createRoot } from 'react-dom/client';
import { App } from './App';
import './modules/shared/global.scss';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
