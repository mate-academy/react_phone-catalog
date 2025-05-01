import { createRoot } from 'react-dom/client';
import { App } from '@pages/App';
import '@styles/main.scss';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
